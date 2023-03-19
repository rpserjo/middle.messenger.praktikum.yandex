import template from './message.hbs';
import './message.css';

const message = (params = {}) => template({ ...params });

export default message;
