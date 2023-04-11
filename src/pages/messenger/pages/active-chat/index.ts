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
//import messengerController from '../../../controllers/MessengerController';
import { SearchUserData } from '../../../../api/UserApi';
import { CreateChatData } from '../../../../api/ChatsApi';

interface ActiveChatProps {
    currentChat: number,
    chatTitle: string,
    chatAvatar: string,
}

class ActiveChatBlock extends Block<ActiveChatProps> {
    constructor(props: ActiveChatProps) {
        super(props, 'Active chat');
    }

    created() {
        const optionsDropDown = new DropDownMenu({
            dropDownMenuIcon: 'options',
            dropDownMenuTitle: 'Options',
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
                    if (e.code === 'Enter') {
                        const users = await userController.searchUsers({ login: addUserInput.value } as SearchUserData);
                        addUserList.setProps({
                            usersList: users,
                        });
                    }
                },
            },
        });

        const addUserList = new (withStore(AddUsersList, (state: State) => {
            return {
                currentChat: state.currentChat,
            };
        }))({});

        const addUserModal = new Modal({
            modalLabel: 'Add user to chat',
            modalChildren: [addUserInput, addUserList],
        });

        // DELETE USER

        const deleteUsersList = new (withStore(DeleteUsersList, (state: State) => {
            return {
                currentChat: state.currentChat,
                usersList: state.currentChatUsers,
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
                            await chatsController.deleteChat({ chatId: store.getState().currentChat });
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
                            input.addEventListener('change', () => {
                                console.log(input.files);
                            });
                            input.click();
                        },
                    },
                },
                {
                    icon: 'geolocation',
                    label: 'Geolocation',
                    events: {
                        click: () => console.log('Attach geolocation'),
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
            },
        });

        const sendIcon = new Button({
            buttonLabel: 'Send',
            icon: 'message',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    // const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
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
                    messengerController.sendMessage(formData.message);
                }
            }
        };

        const newChatSubmitHandler = async (e: Event, input: Input) => {
            e.preventDefault();
            const formData = validateForm([input]);
            if (formData) {
                const result = await chatsController.createChat(formData as CreateChatData);
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

        this.children = {
            addUserModal,
            deleteUserModal,
            deleteChatModal,
            optionsDropDown,
            attachDropDown,
            chatSendMessage,
            sendIcon,
            newChatIcon,
            newChatModal,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
    
    async mounted() {
        //const token = await chatsController.getToken(this.props.currentChat);
    }

    async updated(oldProps: TProps, newProps: TProps) {
        console.log('LOG_0 updated');
        console.log(oldProps, newProps)
        if (!isEqual(oldProps, newProps)) {
            if (newProps.currentChat > 0 && store.getState().chats.length > 0 && newProps.chatTitle === undefined) {
                console.log('LOG1 updated')
                toastController.setWarning(`Chat with ID#${this.props.currentChat} not found`);
                router.go('/messenger');
                store.set('currentChat', null);
                return;
            }
            
            if (newProps.currentChat > 0 && newProps.chatTitle !== null) {
                
                console.log('LOG2 updated')
                const token = await chatsController.getToken(this.props.currentChat);
                console.log(token, this.props.currentChat, store.getState().user.id)
                messengerController.connect({
                    userId: store.getState().user.id,
                    chatId: this.props.currentChat,
                    token
                })
            }
        }
    }
}

const ActiveChat = withStore(ActiveChatBlock, (state: State) => {
    if (state.currentChat == null || state.chats.length === 0) {
        console.log('CHAT WITH STORE, ZERO CHATID');
        return {
            currentChat: null,
            chatTitle: null,
            chatAvatar: null,
        };
    }
    console.log('CHAT WITH STORE, NONZERO CHATID');
    return {
        currentChat: state.currentChat,
        chatTitle: state.chats.find((chat) => chat.id === state.currentChat)?.title || undefined,
        chatAvatar: state.chats.find((chat) => chat.id === state.currentChat)?.avatar,
    };
});

export default ActiveChat;
