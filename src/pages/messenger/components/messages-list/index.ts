import template from './messages-list.hbs';
import Block from '../../../../application/Block';
import store, { State, withStore } from '../../../../application/Store';
import Link from '../../../../components/link';
import Message from '../message';

interface MessagesListProps {
    messagesList?: MessagesList[]
}

class MessagesListBlock extends Block<MessagesListProps>{
    constructor(props: MessagesListProps){
        super(props, 'Messages List');
    }
    
    render() {
        console.log('Messages list render', this.props)
        return this.compile(template, this.props);
    }
    
    updated(oldProps, newProps){
        this.children.messages = this.props.messagesList.reverse().map(message => {
            return new Message({
                ...message
            });
        });
        console.log('MESSAGES LIST', newProps, this.props);
    }
}

const MessagesList = withStore(MessagesListBlock, (state: State) => {
    console.log('MESSAGES LIST withState', [...state.currentChat.messages]);
    return {
        messagesList: [...state.currentChat.messages]
    }
});

export default MessagesList;
