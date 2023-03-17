import template from './message.hbs';
import './message.css';

const message = (params = {}) => {
    return template({...params});
}

export default message;
