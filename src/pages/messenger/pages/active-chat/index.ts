import template from './active-chat.hbs';
import './active-chat.css';
import Block from '../../../../application/Block';
import {State, withStore} from '../../../../application/Store';
import DropDownMenu from '../../../../components/drop-down-menu';
import Input from '../../../../components/input';
import Icon from '../../../../components/icon';
import Modal from '../../../../components/modal';
import {validateForm} from '../../../../application/utils/validate';
import Button from '../../../../components/button';
import chatsController from '../../../../controllers/ChatsController';
import toastController from '../../../../controllers/ToastController';
import store from '../../../../application/Store';
import isEqual from '../../../../application/utils/isEqual';
import router from '../../../../router/router';

interface ActiveChatProps {
    currentChat: number,
    chatTitle: string,
    chatAvatar: string,
}

class ActiveChatBlock extends Block<ActiveChatProps>{
    constructor(props: ActiveChatProps) {
        super(props, 'Active chat');
    }

    created(){
        const optionsDropDown = new DropDownMenu({
            dropDownMenuIcon: 'options',
            dropDownMenuTitle: 'Options',
            dropDownMenuItems: [
                {
                    icon: 'addUser',
                    label: 'Add user',
                    events: {
                        click: () => console.log('Add user'),
                    },
                },
                {
                    icon: 'removeUser',
                    label: 'Remove user',
                    events: {
                        click: () => console.log('Remove user'),
                    },
                },
                {
                    icon: 'remove',
                    label: 'Delete chat',
                    events: {
                        click: async () => {
                            deleteChatModal.show();                            
                        },
                    },
                },
            ],
        });
        
        const addUserModal = new Modal({
            modalLabel: 'Add user to chat',
            
        });
        
        const deleteChatModal = new Modal({
           modalLabel: 'Delete chat?',
           modalChildren: [
                new Button({
                    buttonLabel: 'Delete',
                    events: {
                        click: async () => {
                            const response = await chatsController.deleteChat({chatId: store.getState().currentChat});
                        }
                    }
                }),
                new Button({
                    buttonLabel: 'Cancel',
                    events: {
                        click: () => deleteChatModal.hide()
                    }
                }),
           ]
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
                        }
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
                    //const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, [chatSendMessage]);
                },
            },
        });



        const submitHandler = (e: Event, inputs: Input[]) => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
        };
        
        const newChatSubmitHandler = async(e: Event, input: Input) => {
            e.preventDefault();
            const formData = validateForm([input]);
            if(formData){
                const result = await chatsController.createChat(formData as CreateChatData);
                if(result){
                    input.value = '';
                    newChatModal.hide();
                }
            }
        }

        const newChatInput = new Input({
            label: 'Chat title',
            placeholder: 'Chat title',
            name: 'title',
            id: 'title',
            validation: {
                required: true,
            }
        });

        const newChatSubmit = new Button({
            buttonLabel: 'Create',
            events: {
                click: (e: Event) => newChatSubmitHandler(e, newChatInput)
            }
        })
        const newChatModal = new Modal({
            modalLabel: 'Create new chat',
            modalChildren: [newChatInput, newChatSubmit]
        });
        const newChatIcon = new Icon({
            icon: 'newChat',
            events: {
                click: () => newChatModal.show(true)
            }
        });
        
        this.children = {
            deleteChatModal,
            optionsDropDown,
            attachDropDown,
            chatSendMessage,
            sendIcon,
            newChatIcon,
            newChatModal
        };


    }

    render(){
        return this.compile(template, this.props);
    }
    
    updated(oldProps: TProps, newProps: TProps){
        if(!isEqual(oldProps, newProps)){
            if(newProps.currentChat > 0 && store.getState().chats.length > 0 && newProps.chatTitle === undefined){
                toastController.setWarning(`Chat with ID#${this.props.currentChat} not found`);
                router.go('/messenger');
                store.set('currentChat', null);
            }
        }
    }
}

const ActiveChat = withStore(ActiveChatBlock, (state: State) => {
    console.log('STATE', state)
    if(state.currentChat == null || state.chats.length === 0){
        return {
            currentChat: null,
            chatTitle: null,
            chatAvatar: null
        }
    }
    return {
        currentChat: state.currentChat,
        chatTitle: state.chats.find(chat => chat.id === state.currentChat)?.title || undefined,
        chatAvatar: state.chats.find(chat => chat.id === state.currentChat)?.avatar,
    }
});

export default ActiveChat;
