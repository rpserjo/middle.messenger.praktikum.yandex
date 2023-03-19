import template from './profile.hbs';
import './profile.css';
import input from '../../../../components/input';
import link from '../../../../components/link';
import form from '../../../../components/form';
import avatarUploader from './components/avatar-uploader';
import icon from '../../../../components/icon';

const profile = () => {
    const iconLogout = icon({ icon: 'signout' });
    let formLabel; let
        formData;
    const subroute = (document.location.pathname).replace('/chat/profile', '');
    console.log(subroute);
    switch (subroute) {
    case '/password':
        formLabel = 'Change password';
        formData = [
            input({
                id: 'oldPassword',
                label: 'Old password',
                name: 'oldPassword',
                placeholder: 'Old password',
                type: 'password',
                value: 'password',
            }),
            input({
                id: 'newPassword',
                label: 'New password',
                name: 'newPassword',
                placeholder: 'New password',
                type: 'password',
                value: 'password',
            }),
            input({
                id: 'newPassword2',
                label: 'Repeat new password',
                name: 'newPassword2',
                placeholder: 'Repeat new password',
                type: 'password',
                value: 'password',
            }),
            link({ to: '/chat', label: 'Save', className: 'button' }),
            link({ to: '/chat/profile', label: 'Cancel' }),
        ];
        break;
    case '/avatar':
        formLabel = 'Upload avatar';
        formData = [
            avatarUploader({ currentAvatar: '/static/avatars/professorx.png', uploadForm: true }),
            link({ to: '/chat/profile', label: 'Save', className: 'button' }),
            link({ to: '/chat', label: 'Cancel' }),
        ];
        break;
    default:
        formLabel = 'Edit profile';
        formData = [
            avatarUploader({ currentAvatar: '/static/avatars/professorx.png' }),
            input({
                id: 'email', label: 'E-mail', name: 'email', placeholder: 'E-mail', type: 'text', value: 'charlesxavier@ya.ru',
            }),
            input({
                id: 'login', label: 'Login', name: 'login', placeholder: 'Login', type: 'text', value: 'professorx',
            }),
            input({
                id: 'first_name', label: 'First name', name: 'first_name', placeholder: 'First name', type: 'text', value: 'Charles',
            }),
            input({
                id: 'second_name', label: 'Second name', name: 'second_name', placeholder: 'Second name', type: 'text', value: 'Xavier',
            }),
            input({
                id: 'display_name', label: 'Display name', name: 'display_name', placeholder: 'Display name', type: 'text', value: 'Charles Xavier',
            }),
            input({
                id: 'phone', label: 'Phone', name: 'phone', placeholder: 'Phone', type: 'text', value: '+7 (911) 123-45-67',
            }),
            link({ to: '/chat', label: 'Save', className: 'button' }),
            link({ to: '/chat/profile/password', label: 'Change password' }),
        ];
    }

    const formTemplate = form({ formLabel, formData });
    return template({ formData: formTemplate, iconLogout });
};

export default profile;
