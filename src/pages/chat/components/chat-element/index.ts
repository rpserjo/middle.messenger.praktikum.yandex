import template from './chat-element.hbs';
import './chat-element.css';
import Avatar from '../avatar';
import Block from '../../../../application/Block';

interface ChatElementProps {
    id: number | string,
    chatUserAvatar: Avatar,
    chatUserName: string,
    chatNewMessages?: string,
    chatLastMessage: string,
    chatLastMessageTime: string,
    events?: Record<string, Function>
}

class ChatElement extends Block<ChatElementProps> {
    constructor(props: ChatElementProps) {
        super(props, 'ChatElement');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatElement;
