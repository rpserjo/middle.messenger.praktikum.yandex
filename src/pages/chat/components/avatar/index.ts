import template from './avatar.hbs';
import './avatar.css';

const avatar = (params = {}) => template({ ...params });

export default avatar;
