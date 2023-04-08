import template from './signup.hbs';
import './signup.css';
import Block from '../../application/Block';
import Input from '../../components/input';
import { validate, validateForm } from '../../application/utils/validate';
import Button from '../../components/button';
import Link from '../../components/link';
import authController from '../../controllers/AuthController';
import {SignUpData} from '../../api/AuthApi';

interface SignUpProps {

}

class SignUp extends Block {
    constructor(props: SignUpProps) {
        super(props, 'SignUp');
    }

    created() {
        const submitHandler = (e: Event, inputs: Input[]): void => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                authController.signup(formData as SignUpData)
            }
        };

        const emailInput = new Input({
            id: 'email',
            label: 'E-mail',
            name: 'email',
            placeholder: 'E-mail',
            type: 'text',
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
            validation: {
                required: true,
                rule: 'name',
            },
            events: {
                focusin: () => (this.children.firstNameInput as Input).toggleError(),
                focusout: () => {
                    (this.children.firstNameInput as Input).toggleError(validate(this.children.firstNameInput as Input).validationError);
                },
            },
        });

        const secondNameInput = new Input({
            id: 'second_name',
            label: 'Second name',
            name: 'second_name',
            placeholder: 'Second name',
            type: 'text',
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

        const phoneInput = new Input({
            id: 'phone',
            label: 'Phone',
            name: 'phone',
            placeholder: 'Phone',
            type: 'text',
            value: '+',
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
            placeholder: 'Password',
            type: 'password',
            validation: {
                required: true,
                rule: 'password',
            },
            events: {
                focusin: () => (this.children.passwordInput as Input).toggleError(),
                focusout: () => (this.children.passwordInput as Input).toggleError(validate(this.children.passwordInput as Input).validationError),
            },
        });

        this.children = {
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
            validation: {
                required: true,
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
            buttonLabel: 'Create profile',
            type: 'submit',
            events: {
                click: (e: Event) => {
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs as Input[]);
                },
            },
        });

        const signInLink: Link = new Link({
            to: '/signin',
            label: 'Sign in',
            classList: ['my-10'],
        });

        this.children = {
            ...this.children,
            repeatPasswordInput,
            submitButton,
            signInLink,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SignUp;
