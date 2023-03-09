import template from './menu-item.hbs';
import './menu-item.css';

const menuItem = (params = {}) => {
    return template({...params});
}

export default menuItem;
