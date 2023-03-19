import template from './chat.hbs';
import input from '../../components/input';
import './chat.css';
import avatar from './components/avatar';
import chatElement from './components/chat-element';
import noChat from './pages/no-chat';
import activeChat from './pages/active-chat';
import profile from './pages/profile';
import cutString from '../../utils/cutString';
import icon from '../../components/icon';

interface ChatListElement {
    id: number,
    avatarSrc: string,
    chatUserName: string,
    chatNewMessagesCount: number,
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

const chat = () => {
    const profileName = 'Charles Xavier';
    const userAvatar = avatar({ avatarSrc: '/static/avatars/professorx.png', profileName });
    const profileIcon = icon({ icon: 'profile2' });
    const searchIcon = icon({ icon: 'search' });
    const searchInput = input({ placeholder: 'Search', name: 'searchQuery', icon: searchIcon });
    const subRoute = (document.location.pathname).replace('/chat', '');
    const chatsList = [...sampleData, ...sampleData, ...sampleData].map((el: ChatListElement) => {
        el.chatUserAvatar = avatar({ avatarSrc: el.avatarSrc, profileName: el.chatUserName });
        el.chatNewMessages = ((el.chatNewMessagesCount) > 10) ? '9+' : `${el.chatNewMessagesCount}`;
        if (el.chatNewMessagesCount === 0) {
            delete el.chatNewMessages;
        }
        el.chatLastMessage = cutString(el.chatLastMessage, 26);
        return chatElement({ ...el });
    });

    let mainWindow;

    switch (subRoute) {
    case '/profile':
    case '/profile/password':
    case '/profile/avatar':
        mainWindow = profile();
        break;
    case '/view':
        mainWindow = activeChat();
        break;
    default:
        mainWindow = noChat();
    }

    return template({
        profileName, searchInput, chatsList, mainWindow, userAvatar, profileIcon,
    });
};

export default chat;
