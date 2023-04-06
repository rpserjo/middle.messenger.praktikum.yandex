import template from './profile.hbs';
import './profile.css';
import Block from '../../../../application/Block';
import Icon from '../../../../components/icon';
import Input from '../../../../components/input';
import { validate, validateForm } from '../../../../application/utils/validate';
import Button from '../../../../components/button';
import Link from '../../../../components/link';
import AvatarUploader from './components/avatar-uploader';
import authController from '../../../../controllers/AuthController';

class Profile extends Block {
    constructor() {
        super({}, 'Profile');
    }

    created() {
        const iconLogout = new Icon({
            icon: 'signout',
            events: {
                click: async (e) => {
                    e.preventDefault();
                    await authController.logout()
                },
            },
        });

        const submitHandler = (e: Event, inputs: Input[]): void => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
        };
        const subroute = (document.location.pathname).replace('/chat/profile', '');
        const avatarUploader = (subroute === '/avatar')
            ? new AvatarUploader({
                uploadForm: true,
                uploadButton: new Link({ to: '/chat/profile', label: 'Upload', classList: ['button'] }),
                cancelButton: new Link({ to: '/chat/profile', label: 'Cancel' }),
            })
            : new AvatarUploader({
                uploadForm: false,
                currentAvatar: '/static/avatars/professorx.png',
                uploadIcon: new Icon({ icon: 'upload', events: { click: () => { document.location.pathname = '/chat/profile/avatar'; } } }),
            });

        const emailInput = new Input({
            id: 'email',
            label: 'E-mail',
            name: 'email',
            placeholder: 'E-mail',
            type: 'text',
            value: 'charlesxavier@x-men.com',
            validation: {
                required: true,
                rule: 'email',
            },
            events: {
                focusin: () => (this.children.emailInput as Input).toggleError(),
                focusout: () => (this.children.emailInput as Input).toggleError(validate(this.children.emailInput as Input).validationError),
            },
        });

        const loginInput = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            value: 'professorx',
            validation: {
                required: true,
                rule: 'login',
            },
            events: {
                focusin: () => (this.children.loginInput as Input).toggleError(),
                focusout: () => (this.children.loginInput as Input).toggleError(validate(this.children.loginInput as Input).validationError),
            },
        });

        const firstNameInput = new Input({
            id: 'first_name',
            label: 'First name',
            name: 'first_name',
            placeholder: 'First name',
            type: 'text',
            value: 'Charles',
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => (this.children.firstNameInput as Input).toggleError(),
                focusout: () => (this.children.firstNameInput as Input).toggleError(validate(this.children.firstNameInput as Input).validationError),
            },
        });

        const secondNameInput = new Input({
            id: 'second_name',
            label: 'Second name',
            name: 'second_name',
            placeholder: 'Second name',
            type: 'text',
            value: 'Xavier',
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => (this.children.secondNameInput as Input).toggleError(),
                focusout: () => {
                    (this.children.secondNameInput as Input).toggleError(validate(this.children.secondNameInput as Input).validationError);
                },
            },
        });

        const displayNameInput = new Input({
            id: 'display_name',
            label: 'Display name',
            name: 'display_name',
            placeholder: 'Display name',
            type: 'text',
            value: 'Charles',
            validation: {
                // required: true,
                rule: 'name',
            },
            events: {
                focusin: () => (this.children.displayNameInput as Input).toggleError(),
                focusout: () => {
                    (this.children.displayNameInput as Input).toggleError(validate(this.children.displayNameInput as Input).validationError);
                },
            },
        });

        const phoneInput = new Input({
            id: 'phone',
            label: 'Phone',
            name: 'phone',
            placeholder: 'Phone',
            type: 'text',
            value: '+9999999999',
            validation: {
                required: true,
                rule: 'phone',
            },
            events: {
                focusin: () => (this.children.phoneInput as Input).toggleError(),
                focusout: () => (this.children.phoneInput as Input).toggleError(validate(this.children.phoneInput as Input).validationError),
            },
        });

        const passwordInput: Block = new Input({
            id: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Leave it blank to keep current password',
            type: 'password',
            value: '',
            validation: {
                // required: true,
                rule: 'password',
            },
            events: {
                focusin: () => (this.children.passwordInput as Input).toggleError(),
                focusout: () => (this.children.passwordInput as Input).toggleError(validate(this.children.passwordInput as Input).validationError),
            },
        });

        this.children = {
            iconLogout,
            avatarUploader,
            emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            displayNameInput,
            phoneInput,
            passwordInput,
        };

        const repeatPasswordInput: Input = new Input({
            id: 'password2',
            label: 'Repeat password',
            name: 'password2',
            placeholder: 'Repeat password',
            type: 'password',
            validation: {
                // required: true,
                equals: { target: this.children.passwordInput, errorMessage: 'Passwords not match' },
            },
            events: {
                focusin: () => (this.children.repeatPasswordInput as Input).toggleError(),
                focusout: () => {
                    (this.children.repeatPasswordInput as Input).toggleError(validate(this.children.repeatPasswordInput as Input).validationError);
                },
            },
        });

        const submitButton: Button = new Button({
            buttonLabel: 'Update profile',
            type: 'submit',
            events: {
                click: (e: Event) => {
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs as Input[]);
                },
            },
        });

        const cancelLink: Link = new Link({
            to: '/chat',
            label: 'Cancel',
            classList: ['my-10'],
        });

        this.children = {
            ...this.children, repeatPasswordInput, submitButton, cancelLink,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Profile;
