import template from './form.hbs';
import './form.css';

const form = (params = {}) => {
    return template({...params});
}
const test = false;
export default form;
