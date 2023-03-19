import template from './date-line.hbs';
import './date-line.css';

const dateLine = (params = {}) => template({ ...params });

export default dateLine;
