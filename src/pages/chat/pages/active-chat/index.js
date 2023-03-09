import template from './active-chat.hbs';
import './active-chat.css';
import avatar from '../../components/avatar';
import icon from '../../../../components/icon';
import input from '../../../../components/input';
import menuItem from './components/menu-item';
import message from './components/message';
import dateLine from './components/date-line';

/*Sample data*/
const chatTitle = 'James Howlett';
const chatAvatar = avatar({avatarSrc: '/static/avatars/wolverine.png', profileName: chatTitle});
const messages = [
    {
        type: 'inbox',
        content: 'received message ',
        datetime: '13:20'
    },
    {
        type: 'outbox',
        content: 'sent message ',
        datetime: '15:20'
    }
]
/*Sample data*/

const activeChat = (params = {}) => {
    const optionsIcon = icon({icon: 'options'});
    const attachIcon = icon({icon: 'attach'});
    const sendIcon = icon({icon: 'message'});
    const chatMessage = input({type: 'text', name: 'message', id: 'message', placeholder: 'Message'});
    const optionsOptions = [
        menuItem({itemIcon: icon({icon: 'addUser'}), itemLabel: 'Add user'}),
        menuItem({itemIcon: icon({icon: 'removeUser'}), itemLabel: 'Remove user'}),
        menuItem({itemIcon: icon({icon: 'remove'}), itemLabel: 'Delete chat'})
    ];
    const attachOptions = [
        menuItem({itemIcon: icon({icon: 'media'}), itemLabel: 'Media'}),
        menuItem({itemIcon: icon({icon: 'geolocation'}), itemLabel: 'Geolocation'})
    ];

    const chat = Array.from(Array(50)).map((el, i) => {
        if(i % 8 === 0){
            return dateLine({date: '01/02/03'});
        }else{
            const key = Math.round(Math.random());
            const sample = messages[key];
            return message({messageType: sample.type, messageContent: sample.content.repeat(Math.ceil(Math.random() * 30)), messageDatetime: sample.datetime})
        }
    });
    return template({...params, chatAvatar, chatTitle, optionsIcon, attachIcon, sendIcon, chatMessage, optionsOptions, attachOptions, chat});
}

export default activeChat;
