import template from './no-chat.hbs';
import './no-chat.css';
import icon from '../../../../components/icon';

const noChat = (params = {}) => {
	return template({...params, newChatIcon: icon({icon: 'newChat'})});
}

export default noChat;