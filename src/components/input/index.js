import template from './input.hbs';
import './input.css';

const input = (params = {}) => {
    return template({...params});
}

export default input;