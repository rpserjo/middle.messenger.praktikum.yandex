import template from './active-chat.hbs';
import './active-chat.css';
import Block from '../../../../application/Block';
import {State, withStore} from '../../../../application/Store';
import DropDownMenu from '../../../../components/drop-down-menu';
import Input from '../../../../components/input';
import {validateForm} from '../../../../application/utils/validate';
import Button from '../../../../components/button';

interface ActiveChatProps {
    currentChat: number,
    chatTitle: string,
    chatAvatar: string,
}

class ActiveChatBlock extends Block<ActiveChatProps>{
    constructor(props: ActiveChatProps) {
        super(props);
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
                        click: () => console.log('Delete chat'),
                    },
                },
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
                        click: () => console.log('Attach media'),
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

        this.children = {
            optionsDropDown,
            attachDropDown,
            chatSendMessage,
            sendIcon,
        };

        const submitHandler = (e: Event, inputs: Input[]) => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
        };


    }

    render(){
        return this.compile(template, this.props);
    }
}

const ActiveChat = withStore(ActiveChatBlock, (state: State) => {
    if(state.currentChat == null || state.chats.length === 0){
        return {
            currentChat: state.currentChat,
            chatTitle: 'no title',
            chatAvatar: 'no avatar'
        }
    }
    return {
        currentChat: state.currentChat,
        chatTitle: state.chats.find(chat => chat.id === state.currentChat)?.title,
        chatAvatar: state.chats.find(chat => chat.id === state.currentChat)?.avatar,
    }
});

export default ActiveChat;
