import template from './chat-element.hbs';
import './chat-element.css';
import Block from '../../../../application/Block';
import cutString from '../../../../application/utils/cutString';
import store from '../../../../application/Store';

interface ChatListElementProps {
    currentChat: Nullable<number>,
    chatElement: IChatElement,
    events?: () => void
}

class ChatListElement extends Block<ChatListElementProps> {
    constructor(props: ChatListElementProps) {
        super(props);
    }

    created() {
/*        if (this.props.id === store.getState().currentChat) {
            console.log(this.props.id);
        }*/
        const chatLastMessage = (this.props.chatElement.last_message) ? cutString(this.props.chatElement.last_message.content, 15) : 'No messages...';
        const chatNewMessages = (this.props.chatElement.unread_count) ? (this.props.chatElement.unread_count) : '';
        this.setProps({ chatLastMessage, chatNewMessages });
        /*this.props.events = {
            click: () => {
                document.querySelectorAll('.active').forEach((el) => el.classList.remove('active'));
                this.getElement.classList.add('active');
            },
        };*/
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatListElement;
