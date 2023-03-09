import template from './chat.hbs';
import input from '../../components/input';
import './chat.css';
import avatar from './components/avatar';
import chatElement from './components/chat-element';
import noChat from './pages/no-chat';
import activeChat from './pages/active-chat';
import profile from './pages/profile';
import cutString from './utils/cutString';
import icon from '../../components/icon';

const sampleData = [
    {
        id: 1,
        avatarSrc: '/static/avatars/magneto.jpg',
        chatUserName: 'Erik Lehnsherr',
        chatNewMessages: 15,
        chatLastMessage: 'Last message',
        chatLastMessageTime: '18:52'
    },
    {
        id: 2,
        avatarSrc: '/static/avatars/wolverine.png',
        chatUserName: 'James Howlett',
        chatNewMessages: 0,
        chatLastMessage: 'Very very long last message',
        chatLastMessageTime: '10:17'
    },
    {
        id: 3,
        avatarSrc: '/static/avatars/mystique.jpg',
        chatUserName: 'Raven Darkholme',
        chatNewMessages: 5,
        chatLastMessage: 'Last message',
        chatLastMessageTime: 'Mar, 12'
    }
];

const chat = () => {
    const profileName = 'Charles Xavier';
    const userAvatar = avatar({avatarSrc: '/static/avatars/professorx.png', profileName});
    const profileIcon = icon({icon: 'profile2'});
    const searchIcon = icon({icon: 'search'});
    const searchInput = input({placeholder: 'Search', name: 'searchQuery', icon: searchIcon});
    const subRoute = (document.location.pathname).replace('/chat', '');
    const chatsList = [...sampleData, ...sampleData, ...sampleData].map((el) => {
        el.chatUserAvatar = avatar({avatarSrc : el.avatarSrc, profileName: el.chatUserName});
        el.chatNewMessages = ((el.chatNewMessages) > 10) ? '9+' : el.chatNewMessages;
        if(el.chatNewMessages === 0){
            delete el.chatNewMessages;
        }
        el.chatLastMessage = cutString(el.chatLastMessage, 26);
        return chatElement({...el});
    });

    let mainWindow;

    switch(subRoute){
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

    return template({profileName, searchInput, chatsList, mainWindow, userAvatar, profileIcon});
}

export default chat;
