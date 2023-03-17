import template from './button.hbs';
import './button.css';

const button: Function = (params = {}) => {
    return template({...params});
}

export default button;
