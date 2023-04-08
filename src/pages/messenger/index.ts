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
                avatarSrc: API.RESOURCES + state.user!.avatar,
                profileName: `${state.user!.first_name} ${state.user!.second_name}`,
            }
        }))();

        const searchInput = new Input({
            id: 'search',
            name: 'search',
            placeholder: 'Search',
            withoutErrorMessage: true
        });

        const profileIcon = new Icon({
            icon: 'profile2',
            events: {
                click: () => router.go('/settings')
            }
        });

        const logout = new Button({
            buttonLabel: 'logout',
            events: {
                click: () => authController.logout()
            }
        });

        const window: typeof Block | string = (this.props.window === 'settings') ? Profile : (router.getParams()?.id > 0) ? 'chat' : 'no-chat';

        this.children = {
            userAvatar,
            searchInput,
            profileIcon,
            logout
        };

        if(typeof window === 'string') {
            console.log('window', window);
        }else{
            const w: CBlock = new window();
            this.children = {...this.children, w}
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

const Messenger = withStore(MessengerBlock, (state: State) => {
    console.log('MSG', state)
    return {
        user: {
            first_name: state.user?.first_name,
            second_name: state.user?.second_name
        }
    }
});

export default Messenger;
