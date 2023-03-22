import template from './active-chat.hbs';
import './active-chat.css';
import Avatar from '../../components/avatar';
import Block from '../../../../utils/Block';
import Icon from '../../../../components/icon';
import Input from '../../../../components/input';
import { validate, validateForm } from '../../../../utils/validate';
import Message from './components/message';
import DateLine from './components/date-line';
import DropDownMenu from '../../../../components/drop-down-menu';
import Button from '../../../../components/button';

interface ActiveChatProps {
    chatAvatar: Avatar,
    chatTitle: string,
}

class ActiveChat extends Block {
    constructor(props: ActiveChatProps = {}) {
        super('div', props, 'ActiveChat');
    }

    created() {
        this.setProps({
            chatTitle: 'James Howlett',
        });

        const chatAvatar = new Avatar({
            avatarSrc: '/static/avatars/wolverine.png',
            profileName: 'James Howlett',
        });

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
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'message',
            },
            withoutErrorMessage: true,
            events: {
                focusin: () => this.children.chatSendMessage.toggleError(),
                // focusout: () => this.children.chatSendMessage.toggleError(validate(this.children.chatSendMessage).validationError)
            },
        });

        const messages = [
            {
                type: 'inbox',
                content: 'received message ',
                datetime: '13:20',
            },
            {
                type: 'outbox',
                content: 'sent message ',
                datetime: '15:20',
            },
        ];

        const chatMessagesList = Array.from(Array(50)).map((_, i) => {
            if (i % 8 === 0) {
                return new DateLine({ date: '01/02/03' });
            }
            const key = Math.round(Math.random());
            const sample = messages[key];
            return new Message({
                messageType: sample.type,
                messageContent: sample.content.repeat(Math.ceil(Math.random() * 30)),
                messageDatetime: sample.datetime,
            });
        });

        this.children = {
            chatAvatar,
            optionsDropDown,
            attachDropDown,
            chatSendMessage,
            chatMessagesList,
        };

        const submitHandler = (e: Event, inputs: Input[]) => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
        };

        const sendIcon1 = new Icon({
            icon: 'message',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs);
                },
            },
        });

        const sendIcon = new Button({
            buttonLabel: 'Send',
            icon: 'message',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs);
                },
            },
        });

        this.children = {
            ...this.children,
            sendIcon,
        };
    }

    mounted() {
        const list = document.querySelector('#messages-list');
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ActiveChat;
