import template from './active-chat.hbs';
import './active-chat.css';
import Block from '../../../../application/Block';
import store, { State, withStore } from '../../../../application/Store';
import DropDownMenu from '../../../../components/drop-down-menu';
import Input from '../../../../components/input';
import Icon from '../../../../components/icon';
import Modal from '../../../../components/modal';
import { validateForm } from '../../../../application/utils/validate';
import Button from '../../../../components/button';
import chatsController from '../../../../controllers/ChatsController';
import toastController from '../../../../controllers/ToastController';
import messengerController from '../../../../controllers/MessengerController';

import isEqual from '../../../../application/utils/isEqual';
import router from '../../../../router/router';
import { AddUsersList, DeleteUsersList } from '../../components/users';
import userController from '../../../../controllers/UserController';
import { SearchUserData } from '../../../../api/UserApi';
import MessagesList from '../../components/messages-list';
import Avatar from '../../components/avatar';
import API from '../../../../api/Api';
import CONFIG from '../../../../application/config';
import MediaPreview from '../../components/media-preview';

interface ActiveChatProps {
    currentChat: {
        id: number | null,
        avatar: string | null,
        title: string | null,
        chatUsers: IUser[]
    }
}

class ActiveChatBlock extends Block<ActiveChatProps> {
    constructor(props: ActiveChatProps) {
        super(props, 'Active chat');
    }

    created() {
        const chatIconBack = new Icon({
            icon: 'back',
            events: {
                click: () => router.go('/messenger'),
            },
        });

        const chatAvatar = new (withStore(Avatar, (state: State) => {
            return {
                avatarSrc: (state.currentChat.avatar) ? `${API.RESOURCES}${state.currentChat.avatar}` : CONFIG.CHAT_AVATAR,
                profileName: state.currentChat.title,
            };
        }))({
            events: {
                click: () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async () => {
                        if (input.files?.length) {
                            await chatsController.uploadAvatar({ avatar: input.files[0], chatId: String(this.props.currentChat.id) });
                        }
                    };
                    input.click();
                },
            },

        });

        const optionsDropDown = new DropDownMenu({
            dropDownMenuIcon: 'options',
            dropDownMenuTitle: 'Options',
            hidden: true,
            dropDownMenuItems: [
                {
                    icon: 'addUser',
                    label: 'Add user',
                    events: {
                        click: () => addUserModal.show(true),
                    },
                },
                {
                    icon: 'removeUser',
                    label: 'Remove user',
                    events: {
                        click: () => deleteUserModal.show(true),
                    },
                },
                {
                    icon: 'remove',
                    label: 'Delete chat',
                    events: {
                        click: () => deleteChatModal.show(true),
                    },
                },
            ],
        });
        // ADD USER
        const addUserInput = new Input({
            name: 'query',
            placeholder: 'Enter user login an press Enter',
            label: 'Search for user',
            events: {
                keydown: async (e: KeyboardEvent) => {
                    if (e.code === 'Enter' || e.keyCode === 13) {
                        const users = await userController.searchUsers({ login: addUserInput.value } as SearchUserData) as IUser[];
                        addUserList.setProps({
                            usersList: users,
                        });
                    }
                },
            },
        });

        const addUserList = new (withStore(AddUsersList, (state: State) => {
            return {
                currentChatId: Number(state.currentChat.id),
                usersList: [],
            };
        }))({});

        const addUserModal = new Modal({
            modalLabel: 'Add user to chat',
            modalChildren: [addUserInput, addUserList],
        });

        // DELETE USER

        const deleteUsersList = new (withStore(DeleteUsersList, (state: State) => {
            return {
                currentChatId: state.currentChat.id,
                usersList: [...state.currentChat.chatUsers],
            };
        }))({});

        const deleteUserModal = new Modal({
            modalLabel: 'Delete user from chat',
            modalChildren: [deleteUsersList],
        });

        const deleteChatModal = new Modal({
            modalLabel: 'Delete chat?',
            modalClass: 'flex-row',
            modalChildren: [
                new Button({
                    buttonLabel: 'Delete',
                    classList: ['inline'],
                    events: {
                        click: async () => {
                            await chatsController.deleteChat({ chatId: Number(this.props.currentChat.id) });
                        },
                    },
                }),
                new Button({
                    buttonLabel: 'Cancel',
                    classList: ['inline'],
                    events: {
                        click: () => deleteChatModal.hide(),
                    },
                }),
            ],
        });

        const mediaPreview = new MediaPreview({});

        const attachDropDown = new DropDownMenu({
            dropDownMenuIcon: 'attach',
            dropDownMenuTitle: 'Attach',
            position: {
                top: -150,
                right: -150,
            },
            hidden: true,
            dropDownMenuItems: [
                {
                    icon: 'media',
                    label: 'Media',
                    events: {
                        click: () => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.multiple = true;
                            input.addEventListener('change', () => {
                                store.set('filesToSend', input.files);
                            });
                            input.click();
                            attachDropDown.hide();
                        },
                    },
                },
                {
                    icon: 'geolocation',
                    label: 'Geolocation',
                    events: {
                        click: () => {
                            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                                chatSendMessage.value = `Lat: ${position.coords.latitude}; Lon: ${position.coords.longitude}`;
                            }, () => {
                                toastController.setDanger('Access to geolocation denied');
                            });
                            attachDropDown.hide();
                        },
                    },
                },
            ],
        });

        const chatSendMessage = new Input({
            type: 'text',
            name: 'message',
            id: 'message',
            value: '',
            placeholder: 'Message',
            validation: {
                required: true,
                rule: 'message',
            },
            withoutErrorMessage: true,
            events: {
                focusin: () => (chatSendMessage as Input).toggleError(),
                keydown: (e: KeyboardEvent) => {
                    if (e.code === 'Enter' || e.keyCode === 13) {
                        submitHandler(e, [chatSendMessage]);
                    }
                },
            },
        });

        const sendIcon = new Button({
            buttonLabel: 'Send',
            icon: 'message',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    submitHandler(e, [chatSendMessage]);
                },
            },
        });

        const submitHandler = (e: Event, inputs: Input[]) => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
                if (formData.message.length > 0) {
                    chatSendMessage.value = '';
                    messengerController.sendMessage(formData.message);
                }
            }
        };

        const newChatSubmitHandler = async (e: Event, input: Input) => {
            e.preventDefault();
            const formData = validateForm([input]);
            if (formData) {
                const result = await chatsController.createChat(formData as ICreateChatData);
                if (result) {
                    input.value = '';
                    newChatModal.hide();
                }
            }
        };

        const newChatInput = new Input({
            label: 'Chat title',
            placeholder: 'Chat title',
            name: 'title',
            id: 'title',
            validation: {
                required: true,
            },
        });

        const newChatSubmit = new Button({
            buttonLabel: 'Create',
            events: {
                click: (e: Event) => newChatSubmitHandler(e, newChatInput),
            },
        });

        const newChatModal = new Modal({
            modalLabel: 'Create new chat',
            modalChildren: [newChatInput, newChatSubmit],
        });

        const newChatIcon = new Icon({
            icon: 'newChat',
            events: {
                click: () => newChatModal.show(true),
            },
        });

        const messagesList = new MessagesList({});

        this.children = {
            addUserModal,
            deleteUserModal,
            deleteChatModal,
            chatIconBack,
            chatAvatar,
            optionsDropDown,
            attachDropDown,
            chatSendMessage,
            sendIcon,
            newChatIcon,
            newChatModal,
            messagesList,
            mediaPreview,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
    
    mounted() {
        this.loadDialog();
    }
    
    loadDialog(): void {
        if (this.props.currentChat.id > 0 && this.props.currentChat.title !== null) {
            messengerController.connect({
                userId: store.getState().user.id,
                chatId: Number(this.props.currentChat.id),
            });
        }
    }

    async updated(oldProps: TProps, newProps: TProps) {
        if (!isEqual(oldProps, newProps)) {
            if (newProps.currentChat.id > 0 && store.getState().chatsList.length > 0 && newProps.currentChat.title === undefined) {
                toastController.setWarning(`Chat with ID#${this.props.currentChat.id} not found`);
                router.go('/messenger');
                store.set('currentChat', {
                    id: null,
                    title: null,
                    avatar: null,
                    chatUsers: [],
                    messages: [],
                });
                return;
            }

            this.loadDialog();
        }
    }
}

const ActiveChat = withStore(ActiveChatBlock, (state: State) => {
    return {
        currentChat: {
            id: state.currentChat.id,
            title: state.currentChat.title,
        },
    };
});

export default ActiveChat;
