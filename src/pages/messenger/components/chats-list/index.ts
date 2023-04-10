import template from './chats-list.hbs';
import Block from '../../../../application/Block';
import { User } from '../../../../api/AuthApi';
import { State, withStore } from '../../../../application/Store';
import chatsController from '../../../../controllers/ChatsController';
import ChatListElement from '../chat-element';
import Link from '../../../../components/link';
import isEqual from '../../../../application/utils/isEqual';

export interface ChatElement{
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: User,
        time: string,
        content: string
    }
}
interface ChatListProps {
    chats: ChatElement[]
}

class ChatsListBlock extends Block<ChatListProps> {
    constructor(props: ChatListProps) {
        super(props, 'Chats list');
    }

    created() {
        chatsController.getChats();
        if (this.props.chats) {
            this.children.list = this.props.chats.map((e) => {
                return new Link({
                    label: new ChatListElement({
                        ...e,
                        events: {
                            click: () => console.log('TETS', this),
                        },
                    }),
                    to: `/messenger/${e.id}`,
                    type: 'inherit',
                    routerLink: true,

                });
            });
        }
    }

    updated(oldProps: Record<string, any>, newProps: Record<string, any>) {
        if (!isEqual(oldProps, newProps)) {
            this.children.list = this.props.chats.map((e) => {
                return new Link({
                    label: new ChatListElement(e),
                    to: `/messenger/${e.id}`,
                    type: 'inherit',
                    routerLink: true,
                });
            });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

const ChatList = withStore(ChatsListBlock, (state: State) => {
    return {
        chats: [...state.chats],
    };
});

export default ChatList;
