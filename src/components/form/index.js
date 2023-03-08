import template from './form.hbs';
import './form.css';

const form = (params = {}) => {
    return template({...params});
}

export default form;