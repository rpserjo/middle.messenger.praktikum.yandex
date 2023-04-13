import template from './messages-list.hbs';
import Block from '../../../../application/Block';
import { State, withStore } from '../../../../application/Store';
import Message from '../message';

interface MessagesListProps {
    messagesList?: IMessagesList[]
}

class MessagesListBlock extends Block<MessagesListProps> {
    constructor(props: MessagesListProps) {
        super(props, 'Messages List');
    }

    render() {
        return this.compile(template, this.props);
    }

    updated() {
        this.children.messages = this.props.messagesList?.reverse().map((message) => {
            return new Message(message);
        }) || [];
        setTimeout(() => {
            const div = document.querySelector('#messages-list');
            div?.scrollBy({
                top: div.scrollHeight,
                behavior: 'smooth',
            });
        }, 200);
    }
}

const MessagesList = withStore(MessagesListBlock, (state: State) => {
    return {
        messagesList: [...state.currentChat.messages],
    };
});

export default MessagesList;
