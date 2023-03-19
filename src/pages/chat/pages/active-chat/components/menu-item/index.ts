import template from './menu-item.hbs';
import './menu-item.css';

const menuItem = (params = {}) => template({ ...params });

export default menuItem;
