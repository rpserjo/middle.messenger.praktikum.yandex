import template from './error.hbs';
import './error.css';
import link from '../../components/link';

const error = (params = {}) => {
    params.code = params.code || '404';
    params.message = params.message || 'Not found';
    const backLink = link({to: '/chat', label: 'Back to chats'})

    return template({...params, backLink});
}

export default error;
