import template from './profile.hbs';
import './profile.css';
import Block from '../../../../utils/Block';
import Icon from '../../../../components/icon';
import Input from '../../../../components/input';
import { validate, validateForm } from '../../../../utils/validate';
import Button from '../../../../components/button';
import Link from '../../../../components/link';
import AvatarUploader from './components/avatar-uploader';

class Profile extends Block {
    constructor(props: {}) {
        super('div', props, 'Profile');
    }

    created() {
        const iconLogout = new Icon({
            icon: 'signout',
            events: {
                click: () => document.location.pathname('/signin'),
            },
        });

        const submitHandler = (e: Event, inputs: Input[]): void => {
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
        };
        const subroute = (document.location.pathname).replace('/chat/profile', '');
        let avatarUploaderProps = {
            currentAvatar: '/static/avatars/professorx.png',
            uploadIcon: new Icon({ icon: 'upload', events: { click: () => document.location.pathname('/chat/profile/avatar') } }),
        };

        if (subroute === '/avatar') {
            avatarUploaderProps = {
                uploadForm: true,
                uploadButton: new Link({ to: '/chat/profile', label: 'Upload', classList: ['button'] }),
                cancelButton: new Link({ to: '/chat/profile', label: 'Cancel' }),
            };
        }
        const avatarUploader = new AvatarUploader({
            ...avatarUploaderProps,
        });

        const emailInput = new Input({
            id: 'email',
            label: 'E-mail',
            name: 'email',
            placeholder: 'E-mail',
            type: 'text',
            value: 'charlesxavier@x-men.com',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'email',
            },
            events: {
                focusin: () => this.children.emailInput.toggleError(),
                focusout: () => this.children.emailInput.toggleError(validate(this.children.emailInput).validationError),
            },
        });

        const loginInput = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            value: 'professorx',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'login',
            },
            events: {
                focusin: () => this.children.loginInput.toggleError(),
                focusout: () => this.children.loginInput.toggleError(validate(this.children.loginInput).validationError),
            },
        });

        const firstNameInput = new Input({
            id: 'first_name',
            label: 'First name',
            name: 'first_name',
            placeholder: 'First name',
            type: 'text',
            value: 'Charles',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => this.children.firstNameInput.toggleError(),
                focusout: () => this.children.firstNameInput.toggleError(validate(this.children.firstNameInput).validationError),
            },
        });

        const secondNameInput = new Input({
            id: 'second_name',
            label: 'Second name',
            name: 'second_name',
            placeholder: 'Second name',
            type: 'text',
            value: 'Xavier',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => this.children.secondNameInput.toggleError(),
                focusout: () => this.children.secondNameInput.toggleError(validate(this.children.secondNameInput).validationError),
            },
        });

        const phoneInput = new Input({
            id: 'phone',
            label: 'Phone',
            name: 'phone',
            placeholder: 'Phone',
            type: 'text',
            value: '+9999999999',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'phone',
            },
            events: {
                focusin: () => this.children.phoneInput.toggleError(),
                focusout: () => this.children.phoneInput.toggleError(validate(this.children.phoneInput).validationError),
            },
        });

        const passwordInput: Block = new Input({
            id: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Leave it blank to keep current password',
            type: 'password',
            value: '',
            classList: 'my-10',
            validation: {
                // required: true,
                rule: 'password',
            },
            events: {
                focusin: () => this.children.passwordInput.toggleError(),
                focusout: () => this.children.passwordInput.toggleError(validate(this.children.passwordInput).validationError),
            },
        });

        this.children = {
            iconLogout,
            avatarUploader,
            emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            phoneInput,
            passwordInput,
        };

        const repeatPasswordInput: Input = new Input({
            id: 'password2',
            label: 'Repeat password',
            name: 'password2',
            placeholder: 'Repeat password',
            type: 'password',
            classList: 'my-10',
            validation: {
                // required: true,
                equals: { target: this.children.passwordInput, errorMessage: 'Passwords not match' },
            },
            events: {
                focusin: () => this.children.repeatPasswordInput.toggleError(),
                focusout: () => this.children.repeatPasswordInput.toggleError(validate(this.children.repeatPasswordInput).validationError),
            },
        });

        const submitButton: Button = new Button({
            buttonLabel: 'Create profile',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs);
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
