import template from './chats-list.hbs';
import Block from '../../../../application/Block';
import { User } from '../../../../api/AuthApi';
import { State, withStore } from '../../../../application/Store';
import chatsController from '../../../../controllers/ChatsController';
import ChatListElement from '../chat-element';
import Link from '../../../../components/link';
import isEqual from '../../../../application/utils/isEqual';

/*export interface ChatElement{
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: User,
        time: string,
        content: string
    }
}*/

interface ChatListProps {
    chatsList: IChatElement[]
}

class ChatsListBlock extends Block<ChatListProps> {
    constructor(props: ChatListProps = {}) {
        super(props, 'Chats list');
    }

    private propsToChildren(): void {
        console.log('props 2 children')
        this.children.list = this.props.chatsList.map((chatElement: IChatElement) => {
            return new Link({
                label: new ChatListElement({
                    chatElement
                }),
                to: `/messenger/${chatElement.id}`,
                type: 'inherit',
                routerLink: true,
            });
        });
    }

    created() {
       if (this.props.chatsList) {
            this.propsToChildren();
        }
    }

    updated(oldProps: Record<string, any>, newProps: Record<string, any>) {
        console.log('chats list updated');
        if (!isEqual(oldProps, newProps)) {
            console.log(oldProps, newProps)
            this.propsToChildren();
        }
    }

    render() {
        console.log('chats list render', this.children)
        return this.compile(template, this.props);
    }
}

const ChatList = withStore(ChatsListBlock, (state: State) => {
    return {
        chatsList: [...state.chatsList],
    };
});

export default ChatList;
