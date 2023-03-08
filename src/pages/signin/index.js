import template from './signin.hbs';
import './singin.css';
import form from '../../components/form';
import input from '../../components/input';
import button from '../../components/button';
import link from '../../components/link';

const signin = () => {
    const formLabel = 'Sign In';
    const formData = [
        input({id: 'login', label: 'Login', name: 'login', placeholder: 'Login', type: 'text', value: '', classList: 'my-10'}),
        input({id: 'password', label: 'Password', name: 'password', placeholder: 'Password', type: 'password', value: ''}),
        link({to: '/chat', label: 'Sign in', className: 'button'}),
        link({to: '/signup', label: 'Create profile'})
    ];
    const formTemplate = form({formLabel, formData});

    return template({form: formTemplate});
}

export default signin;
