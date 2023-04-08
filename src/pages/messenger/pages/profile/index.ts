import template from './profile.hbs';
import './profile.css';
import Block from '../../../../application/Block';
import Icon from '../../../../components/icon';
import Input from '../../../../components/input';
import { validate, validateForm } from '../../../../application/utils/validate';
import Button from '../../../../components/button';
import Link from '../../../../components/link';
import authController from '../../../../controllers/AuthController';
import {User} from '../../../../api/AuthApi';
import {State, withStore} from '../../../../application/Store';
import AvatarUploader from './components/avatar-uploader';
import API from '../../../../api/Api';
import userController from '../../../../controllers/UserController';

interface ProfileProps {
    user: User
}

class ProfileBlock extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super(props, 'Profile');
    }

    created() {
        const iconLogout = new Icon({
            icon: 'signout',
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    await authController.logout()
                },
            },
        });

        const submitHandler = async (e: Event, inputs: Input[]): void => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
                await userController.updateProfile(formData)
            }
        };

        const uploadIcon = new Icon({
            icon: 'upload',
            events: {
                click: () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/jpeg, image/png, image/jpg';
                    input.onchange = async () => {
                        if(input.files?.length){
                            await userController.uploadAvatar({avatar: input.files[0]});
                        }
                    }
                    input.click();
                }
            }
        });

        const avatarUploader = new AvatarUploader({
            currentAvatar: API.RESOURCES + this.props.user.avatar,
            uploadIcon
        });

        const emailInput = new Input({
            id: 'email',
            label: 'E-mail',
            name: 'email',
            placeholder: 'E-mail',
            type: 'text',
            value: this.props.user.email,
            validation: {
                required: true,
                rule: 'email',
            },
            events: {
                focusin: () => (emailInput as Input).toggleError(),
                focusout: () => (emailInput as Input).toggleError(validate(emailInput as Input).validationError),
            },
        });

        const loginInput = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            value: this.props.user.login,
            validation: {
                required: true,
                rule: 'login',
            },
            events: {
                focusin: () => (loginInput as Input).toggleError(),
                focusout: () => (loginInput as Input).toggleError(validate(loginInput as Input).validationError),
            },
        });

        const firstNameInput = new Input({
            id: 'first_name',
            label: 'First name',
            name: 'first_name',
            placeholder: 'First name',
            type: 'text',
            value: this.props.user.first_name,
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => (firstNameInput as Input).toggleError(),
                focusout: () => (firstNameInput as Input).toggleError(validate(firstNameInput as Input).validationError),
            },
        });

        const secondNameInput = new Input({
            id: 'second_name',
            label: 'Second name',
            name: 'second_name',
            placeholder: 'Second name',
            type: 'text',
            value: this.props.user.second_name,
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => (secondNameInput as Input).toggleError(),
                focusout: () => {
                    (secondNameInput as Input).toggleError(validate(secondNameInput as Input).validationError);
                },
            },
        });

        const displayNameInput = new Input({
            id: 'display_name',
            label: 'Display name',
            name: 'display_name',
            placeholder: 'Display name',
            type: 'text',
            value: this.props.user.display_name,
            validation: {
                rule: 'name',
            },
            events: {
                focusin: () => (displayNameInput as Input).toggleError(),
                focusout: () => (displayNameInput as Input).toggleError(validate(displayNameInput as Input).validationError),
            },
        });

        const phoneInput = new Input({
            id: 'phone',
            label: 'Phone',
            name: 'phone',
            placeholder: 'Phone',
            type: 'text',
            value: this.props.user.phone,
            validation: {
                required: true,
                rule: 'phone',
            },
            events: {
                focusin: () => (phoneInput as Input).toggleError(),
                focusout: () => (phoneInput as Input).toggleError(validate(phoneInput as Input).validationError),
            },
        });

        /*const passwordInput: Block = new Input({
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
        });*/

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

        this.children = {
            avatarUploader,
            iconLogout,
            emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            displayNameInput,
            phoneInput,
            submitButton
            /*passwordInput,*/
        };

        /*const repeatPasswordInput: Input = new Input({
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
        });*/



        /*const cancelLink: Link = new Link({
            to: '/chat',
            label: 'Cancel',
            classList: ['my-10'],
        });

        this.children = {
            ...this.children, repeatPasswordInput, submitButton, cancelLink,
        };*/
    }

    render() {
        return this.compile(template, this.props);
    }
}

const Profile = withStore(ProfileBlock, (state: State) => {
    return {user: state.user}
});

export default Profile;
