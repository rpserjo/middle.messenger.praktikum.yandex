import template from './button.hbs';
import './button.css';

const button = (params = {}) => {
    return template({...params});
}

export default button;
