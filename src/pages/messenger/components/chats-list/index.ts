import template from './chats-list.hbs';
import Block from '../../../../application/Block';
import { User } from '../../../../api/AuthApi';
import { State, withStore } from '../../../../application/Store';
import chatsController from '../../../../controllers/ChatsController';
import ChatListElement from '../chat-element';
import Link from '../../../../components/link';
import isEqual from '../../../../application/utils/isEqual';

interface ChatListProps {
    chatsList: IChatElement[],
    currentChatId: number | null
}

class ChatsListBlock extends Block<ChatListProps> {
    constructor(props: ChatListProps = {}) {
        super(props, 'Chats list');
    }

    private propsToChildren(): void {
        this.children.list = this.props.chatsList.map((chatElement: IChatElement) => {
            return new Link({
                label: new ChatListElement({
                    chatElement,
                    currentChatId: this.props.currentChatId
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
        chatsList: [...state.chatsList],
    };
});

export default ChatList;
