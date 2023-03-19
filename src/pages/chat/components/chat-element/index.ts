import template from './chat-element.hbs';
import './chat-element.css';

const chatElement = (params = {}) => template({ ...params });

export default chatElement;
