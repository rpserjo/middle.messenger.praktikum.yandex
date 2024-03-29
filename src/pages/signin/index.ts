import template from './signin.hbs';
import './singin.css';
import Block from '../../application/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';
import { validate, validateForm } from '../../application/utils/validate';
import authController from '../../controllers/AuthController';
import { SignInData } from '../../api/AuthApi';
import router from '../../router/router';

class SignIn extends Block {
    constructor(props: Record<string, any> = {}) {
        super(props, 'SignIn');
    }

    created() {
        const submitHandler = async (e: Event, inputs: Input[]): Promise<void> => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
                await authController.signin(formData as SignInData);
            }
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
                focusin: () => (loginInput as Input).toggleError(),
                focusout: () => (loginInput as Input).toggleError(validate(loginInput as Input).validationError),
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
                focusin: () => (passwordInput as Input).toggleError(),
                focusout: () => (passwordInput as Input).toggleError(validate(passwordInput as Input).validationError),
            },
        });

        const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            type: 'submit',
            events: {
                click: async (e: Event): Promise<void> => {
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    await submitHandler(e, inputs as Input[]);
                },
            },
        });

        const signUpLink: Block = new Link({
            to: '/signup',
            label: 'Create profile',
            classList: ['my-10'],
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    router.go('/sign-up');
                },
            },
        });

        this.children = {
            loginInput,
            passwordInput,
            submitButton,
            signUpLink,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SignIn;
