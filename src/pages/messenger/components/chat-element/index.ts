import template from './chat-element.hbs';
import './chat-element.css';
import Block from '../../../../application/Block';
import cutString from '../../../../application/utils/cutString';
import store from '../../../../application/Store';
import dateFormatter from '../../../../application/utils/dateFormatter';
import Avatar from '../avatar';
import API from '../../../../api/Api';
import CONFIG from '../../../../application/config';

interface ChatListElementProps {
    currentChatId: number | null,
    chatElement: IChatElement,
    events?: () => void,
    chatAvatar?: Avatar,
    chatLastMessage?: string | null,
    chatOwnLastMessage?: boolean,
    chatNewMessages?: string,
    chatLastMessageTime?: string
}

class ChatListElement extends Block<ChatListElementProps> {
    constructor(props: ChatListElementProps) {
        super(props);
    }

    created() {
        const chatAvatar = new Avatar({
            avatarSrc: (this.props.chatElement.avatar) ? `${API.RESOURCES}${this.props.chatElement.avatar}` : CONFIG.CHAT_AVATAR,
            profileName: this.props.chatElement.title,
        });

        this.children = { chatAvatar };
        const chatLastMessage = this.lastMessage(this.props.chatElement.last_message);
        const chatNewMessages = (this.props.chatElement.unread_count) ? this.messagesCount(this.props.chatElement.unread_count) : '';
        const chatLastMessageTime = (this.props.chatElement.last_message) ? dateFormatter(this.props.chatElement.last_message.time, true) : '';
        this.setProps({ chatLastMessage, chatNewMessages, chatLastMessageTime });
    }

    private messagesCount(count: number): string {
        return (count > 9) ? '9+' : `${count}`;
    }

    private lastMessage(lastMessage: Nullable<ILastMessage>): string | null {
        if (!lastMessage) {
            return null;
        }
        this.setProps({ chatOwnLastMessage: lastMessage.user.login === store.getState().user.login });
        return cutString(lastMessage.content, 15);
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
