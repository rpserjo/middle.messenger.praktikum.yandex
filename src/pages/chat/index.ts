import template from './chat.hbs';
import './chat.css';
//import ActiveChat from './pages/active-chat';
import cutString from '../../application/utils/cutString';
import Block from '../../application/Block';
import Input from '../../components/input';
import Avatar from './components/avatar';
import Icon from '../../components/icon';
import ChatElement from './components/chat-element';
import NoChat from './pages/no-chat';
import Profile from './pages/profile';
import router from '../../router/router';
import {CBlock} from '../../application/Route';

interface ChatListElement {
    id: number,
    avatarSrc: string,
    chatUserName: string,
    chatNewMessagesCount?: number,
    chatNewMessages?: string,
    chatLastMessage: string,
    chatLastMessageTime: string,
    chatUserAvatar?: string
}

const sampleData: ChatListElement[] = [
    {
        id: 1,
        avatarSrc: '/static/avatars/magneto.jpg',
        chatUserName: 'Erik Lehnsherr',
        chatNewMessagesCount: 15,
        chatLastMessage: 'Last message',
        chatLastMessageTime: '18:52',
    },
    {
        id: 2,
        avatarSrc: '/static/avatars/wolverine.png',
        chatUserName: 'James Howlett',
        chatNewMessagesCount: 0,
        chatLastMessage: 'Very very long last message',
        chatLastMessageTime: '10:17',
    },
    {
        id: 3,
        avatarSrc: '/static/avatars/mystique.jpg',
        chatUserName: 'Raven Darkholme',
        chatNewMessagesCount: 5,
        chatLastMessage: 'Last message',
        chatLastMessageTime: 'Mar, 12',
    },
];

class Chat extends Block {
    constructor(props: any = {}) {
        super('div', props, 'Chat');
        console.log(props)
    }

    created() {
        this.setProps({
            profileName: 'Charles Xavier',
        });

        const searchInput = new Input({
            id: 'search',
            name: 'search',
            placeholder: 'Search',
        });

        const userAvatar = new Avatar({
            avatarSrc: '/static/avatars/professorx.png',
            profileName: this.props.profileName,
        });

        const profileIcon = new Icon({
            icon: 'profile2',
        });

        const chatsList = [...sampleData, ...sampleData, ...sampleData, ...sampleData, ...sampleData].map((el: ChatListElement) => new ChatElement({
            id: el.id,
            chatUserAvatar: new Avatar({ avatarSrc: el.avatarSrc, profileName: el.chatUserName }),
            chatUserName: el.chatUserName,
            chatNewMessages: ((el?.chatNewMessagesCount || 0) > 10) ? '9+' : el?.chatNewMessages as string,
            chatLastMessage: cutString(el.chatLastMessage, 26),
            chatLastMessageTime: el.chatLastMessageTime,
            events: {
                click: () => {
                    router.go('/messenger/123')
                },
            },
        }));

        //const subRoute = (document.location.pathname).replace('/chat', '');

        let mainWindow: CBlock = NoChat;
        const { window } = this.props;
        if(window && window === 'settings'){
            mainWindow = Profile;
        }
        /*
        switch (subRoute) {
        case '/profile':
        case '/profile/password':
        case '/profile/avatar':
            mainWindow = new Profile();
            break;
        case '/view':
            mainWindow = new ActiveChat();
            break;
        default:
            mainWindow = new NoChat();
        }*/

        this.children = {
            searchInput,
            userAvatar,
            profileIcon,
            chatsList,
            mainWindow: new mainWindow(),
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Chat;
