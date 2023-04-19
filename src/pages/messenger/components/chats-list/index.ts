import template from './chats-list.hbs';
import Block from '../../../../application/Block';
import { State, withStore } from '../../../../application/Store';
import ChatListElement from '../chat-element';
import Link from '../../../../components/link';
import isEqual from '../../../../application/utils/isEqual';

interface ChatListProps {
    chatsList: IChatElement[],
    currentChatId: number | null
}

class ChatsListBlock extends Block<ChatListProps> {
    constructor(props: ChatListProps) {
        super(props, 'Chats list');
    }

    private propsToChildren(): void {
        this.children.list = this.props.chatsList.sort((a: IChatElement, b: IChatElement) => {
            const aDate: number = new Date(a.last_message?.time || -1).getTime();
            const bDate: number = new Date(b.last_message?.time || -1).getTime();

            return bDate - aDate;
        }).map((chatElement: IChatElement) => {
            return new Link({
                label: new ChatListElement({
                    chatElement,
                    currentChatId: this.props.currentChatId,
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
        if (!isEqual(oldProps, newProps)) {
            this.propsToChildren();
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

const ChatList = withStore(ChatsListBlock, (state: State) => {
    return {
        currentChatId: state.currentChat.id,
        chatsList: [...state.chatsList as any[]],
    };
});

export default ChatList;
