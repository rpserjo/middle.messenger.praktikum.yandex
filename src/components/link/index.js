import template from './link.hbs';
import './link.css';

const link = (params = {}) => {
    const className = params.className || 'link';

    return template({...params, className});
}

export default link;