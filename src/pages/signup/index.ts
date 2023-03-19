import template from './signup.hbs';
import './signup.css';
import form from '../../components/form';
import input from '../../components/input';
// import button from '../../components/button';
import link from '../../components/link';

const signup = () => {
    const formLabel = 'Create profile';
    const formData = [
        input({
            id: 'email', label: 'E-mail', name: 'email', placeholder: 'E-mail', type: 'text',
        }),
        input({
            id: 'login', label: 'Login', name: 'login', placeholder: 'Login', type: 'text',
        }),
        input({
            id: 'first_name', label: 'First name', name: 'first_name', placeholder: 'First name', type: 'text',
        }),
        input({
            id: 'second_name', label: 'Second name', name: 'second_name', placeholder: 'Second name', type: 'text',
        }),
        input({
            id: 'phone', label: 'Phone', name: 'phone', placeholder: 'Phone', type: 'text',
        }),
        input({
            id: 'password', label: 'Password', name: 'password', placeholder: 'Password', type: 'password',
        }),
        input({
            id: 'password2', label: 'Repeat password', name: 'password2', placeholder: 'Repeat password', type: 'password',
        }),
        link({ to: '/chat', label: 'Create profile', className: 'button' }),
        link({ to: '/signin', label: 'Sign in' }),
    ];

    const formTemplate = form({ formLabel, formData });

    return template({ form: formTemplate });
};

export default signup;
