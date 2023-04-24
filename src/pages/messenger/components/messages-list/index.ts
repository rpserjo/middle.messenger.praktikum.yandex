import template from './messages-list.hbs';
import './messages-list.css';
import Block from '../../../../application/Block';
import { State, withStore } from '../../../../application/Store';
import Message from '../message';
import Button from '../../../../components/button';
import messengerController from '../../../../controllers/MessengerController';

interface MessagesListProps {
    messagesList?: IMessage[],
    canLoadMore?: boolean,
    scroll?: boolean
}

class MessagesListBlock extends Block<MessagesListProps> {
    constructor(props: MessagesListProps) {
        super(props, 'Messages List');
    }

    created() {
        const loadMore = new Button({
            buttonLabel: 'Load more messages',
            id: 'loadMore',
            events: {
                click: () => messengerController.fetchMoreMessages(),
            },
        });
        this.children = { loadMore };
    }

    render() {
        return this.compile(template, this.props);
    }

    mounted() {
        const observer = new IntersectionObserver(() => {
            console.log('intersect');
        }, {
            root: document.querySelector('.messages'),
            rootMargin: '50px',
            threshold: 1.0,
        });
        const target = document.querySelector('#intersector')!;
        observer.observe(target);
    }

    updated() {
        this.children.messages = this.props.messagesList?.map((message: IMessage) => {
            return new Message(message);
        }) || [];
        if (this.props.scroll) {
            setTimeout(() => {
                const div = document.querySelector('#messages-list');
                div?.scrollBy({
                    top: div.scrollHeight,
                    behavior: 'smooth',
                });
            }, 200);
        }
    }
}

const MessagesList = withStore(MessagesListBlock, (state: State) => {
    return {
        messagesList: [...state.currentChat.messages],
        canLoadMore: state.currentChat.canLoadMore,
        scroll: state.currentChat.scroll,
    };
});

export default MessagesList;
