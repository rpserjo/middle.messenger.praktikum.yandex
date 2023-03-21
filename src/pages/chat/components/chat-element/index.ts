import template from './chat-element.hbs';
import './chat-element.css';
import Avatar from '../avatar';
import Block from '../../../../utils/Block';

interface ChatElementProps {
    id: number | string,
    chatUserAvatar: Avatar,
    chatUserName: string,
    chatNewMessages?: string,
    chatLastMessage: string,
    chatMessageLastTime: string
}

class ChatElement extends Block {
    constructor(props: ChatElementProps = {}) {
        super('div', props, 'ChatElement');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatElement;
