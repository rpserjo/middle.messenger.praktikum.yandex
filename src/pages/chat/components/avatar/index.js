import template from './avatar.hbs';
import './avatar.css';

const avatar = (params = {}) => {
    return template({...params});
}

export default avatar;
