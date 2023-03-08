import template from './chat-element.hbs';
import './chat-element.css';

const chatElement = (params = {}) => {
    return template({...params});
}

export default chatElement;
