import template from './messenger.hbs';
import './messenger.css';
import Block from '../../application/Block';
import Input from '../../components/input';
import Icon from '../../components/icon';
import { CBlock } from '../../application/Route';
import { State, withStore } from '../../application/Store';
import API from '../../api/Api';
import Avatar from '../messenger/components/avatar';
import Profile from './pages/profile';
import Link from '../../components/link';
import Password from './pages/password';
import ChatsList from './components/chats-list';
import ActiveChat from './pages/active-chat';
import chatsController from '../../controllers/ChatsController';
import CONFIG from '../../application/config';

interface MessengerProps {
    profileName: string,
    window: string
}

class MessengerBlock extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        super(props, 'Messenger');
    }

    created() {
        const userAvatar = new (withStore(Avatar, (state: State) => {
            return {
                avatarSrc: (state.user?.avatar !== null) ? `${API.RESOURCES}${state.user?.avatar}` : CONFIG.USER_AVATAR,
                profileName: `${state.user?.first_name} ${state.user?.second_name}`,
            };
        }))({});

        const searchInput = new Input({
            id: 'search',
            name: 'search',
            placeholder: 'Search',
            withoutErrorMessage: true,
        });

        const profileIcon = new Icon({
            icon: 'profile2',
        });

        const profileLink = new Link({
            label: profileIcon,
            to: '/settings',
            routerLink: true,
        });

        const chatsList = new ChatsList({});

        const windows: Record<string, CBlock> = {
            profile: Profile,
            password: Password,
            chat: ActiveChat,
        };

        this.children = {
            userAvatar,
            searchInput,
            profileLink,
            chatsList,
        };

        if (windows[this.props.window]) {
            const _window: CBlock = windows[this.props.window];
            const currentWindow: Block = new _window({});
            this.children = { ...this.children, currentWindow };
        } else {
            console.log(`Window "${this.props.window}" is not registered`);
        }
    }

    async mounted() {
        await chatsController.getChats();
    }

    render() {
        return this.compile(template, this.props);
    }
}

const Messenger = withStore(MessengerBlock, (state: State) => {
    if (state.user === null) {
        return {
            profileName: null,
        };
    }
    return {
        profileName: `${state.user.first_name} ${state.user.second_name}`,
    };
});

export default Messenger;
