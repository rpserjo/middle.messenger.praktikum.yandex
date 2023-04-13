import template from './chat-element.hbs';
import './chat-element.css';
import Block from '../../../../application/Block';
import cutString from '../../../../application/utils/cutString';
import store from '../../../../application/Store';
import dateFormatter from '../../../../application/utils/dateFormatter';

interface ChatListElementProps {
    currentChatId: number | null,
    chatElement: IChatElement,
    events?: () => void,
    chatLastMessage?: string,
    chatNewMessages?: string,
    chatLastMessageTime?: string
}

class ChatListElement extends Block<ChatListElementProps> {
    constructor(props: ChatListElementProps) {
        super(props);
    }

    created() {
        const chatLastMessage = this.lastMessage(this.props.chatElement.last_message);
        const chatNewMessages = (this.props.chatElement.unread_count) ? this.messagesCount(this.props.chatElement.unread_count) : '';
        const chatLastMessageTime = (this.props.chatElement.last_message) ? dateFormatter(this.props.chatElement.last_message.time, true) : '';
        this.setProps({ chatLastMessage, chatNewMessages, chatLastMessageTime });
    }

    private messagesCount(count: number): string {
        return (count > 9) ? '9+' : `${count}`;
    }

    private lastMessage(lastMessage: Nullable<ILastMessage>): string {
        if (!lastMessage) {
            return '<i>No messages yet</i>';
        }

        return (lastMessage.user.login === store.getState().user.login) ? `<b>You:</b> ${cutString(lastMessage.content, 15)}` : cutString(lastMessage.content, 15);
    }

    render() {
        return this.compile(template, this.props);
    }

    updated() {
        if (this.props.chatElement.id === this.props.currentChatId) {
            setTimeout(() => this.getElement?.classList.add('active'), 0);
        }
    }
}

export default ChatListElement;
