import template from './messenger.hbs';
import './messenger.css';
import Block from '../../application/Block';
import Input from '../../components/input';
import Icon from '../../components/icon';
import {CBlock} from '../../application/Route';
import {State, withStore} from '../../application/Store';
import Button from '../../components/button';
import authController from '../../controllers/AuthController';
import API from '../../api/Api';
import Avatar from '../chat/components/avatar';
import {User} from '../../api/AuthApi';
import Profile from './pages/profile';
import router from '../../router/router';
import Link from '../../components/link';
import Password from './pages/password';
import NoChat from './pages/no-chat';
import ChatsList from './components/chats-list';
import ActiveChat from './pages/active-chat';

interface MessengerProps {
    user: {
        first_name: string,
        second_name: string
    },
    chats: any[],
    window: string
}

class MessengerBlock extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        super(props, 'Messenger');
    }

    created() {
        const userAvatar = new(withStore(Avatar, (state: State) => {
            return {
                avatarSrc: API.RESOURCES + state.user?.avatar,
                profileName: `${state.user?.first_name} ${state.user?.second_name}`,
            }
        }))();

        const searchInput = new Input({
            id: 'search',
            name: 'search',
            placeholder: 'Search',
            withoutErrorMessage: true
        });

        const profileIcon = new Icon({
            icon: 'profile2'
        });

        const profileLink = new Link({
            label: profileIcon,
            to: '/settings',
            routerLink: true
        });

        const chatsList = new ChatsList();

        const windows: Record<string, Block> = {
            noChat: NoChat,
            profile: Profile,
            password: Password,
            chat: ActiveChat
        }

        this.children = {
            userAvatar,
            searchInput,
            profileLink,
            chatsList
        };

        if(windows[this.props.window]){
            const currentWindow: CBlock = new windows[this.props.window]();
            this.children = {...this.children, currentWindow}
        }else{
            console.log(`Window "${this.props.window}" is not registered`)
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

const Messenger = withStore(MessengerBlock, (state: State) => {
    return {
        user: {
            first_name: state.user?.first_name,
            second_name: state.user?.second_name
        }
    }
});

export default Messenger;
