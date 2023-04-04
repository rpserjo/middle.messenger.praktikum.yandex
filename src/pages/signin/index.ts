import template from './signin.hbs';
import './singin.css';
import Block from '../../application/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';
import { validate, validateForm } from '../../application/utils/validate';
import {Spinner} from '../../components/spinner';
import store from '../../application/Store';
//import router from '../../router/router';


class SignIn extends Block {
    constructor(props: Record<string, any> = {}) {
        super(props, 'SignIn');
    }

    created() {
        const submitHandler = (e: Event, inputs: Input[]) => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
            console.log(store.getState().isLoading)
            store.set('isLoading', !store.getState().isLoading)
            console.log(store)
        };

        const loginInput: Block = new Input({
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

        const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            type: 'submit',
            events: {
                click: (e: Event) => {
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs as Input[]);
                },
            },
        });

        const signUpLink: Block = new Link({
            to: '/signup',
            label: 'Create profile',
            classList: ['my-10'],
        });

        const spinner: Block = new Spinner();

        this.children = {
            loginInput,
            passwordInput,
            submitButton,
            signUpLink,
            spinner
        };

        console.log(this.children)
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SignIn;
