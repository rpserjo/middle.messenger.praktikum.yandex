import template from './signup.hbs';
import './signup.css';
import Block from '../../utils/Block';
import Input from '../../components/input';
import { validate, validateForm } from '../../utils/validate';
import Button from '../../components/button';
import Link from '../../components/link';

interface SignUpProps {

}

class SignUp extends Block {
    constructor(props: SignUpProps = {}) {
        super('div', props, 'SignUp');
    }

    created() {
        const submitHandler = (e: Event, inputs: Input[]): void => {
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
            }
        };

        const emailInput = new Input({
            id: 'email',
            label: 'E-mail',
            name: 'email',
            placeholder: 'E-mail',
            type: 'text',
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
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'login',
            },
            events: {
                focusin: () => this.children?.loginInput.toggleError(),
                focusout: () => this.children?.loginInput.toggleError(validate(this.children?.loginInput).validationError),
            },
        });

        const firstNameInput = new Input({
            id: 'first_name',
            label: 'First name',
            name: 'first_name',
            placeholder: 'First name',
            type: 'text',
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
            value: '+',
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
            placeholder: 'Password',
            type: 'password',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'password',
            },
            events: {
                focusin: () => this.children.passwordInput.toggleError(),
                focusout: () => this.children.passwordInput.toggleError(validate(this.children.passwordInput).validationError),
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
                focusin: () => (this.children.repeatPasswordInput).toggleError(),
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
