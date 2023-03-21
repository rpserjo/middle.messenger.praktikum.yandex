import template from './signin.hbs';
import './singin.css';
import Block from '../../utils/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';
import { validate, validateForm } from '../../utils/validate';


class SignIn extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'SignIn');
    }

    created() {
		const submitHandler = (e: Event, inputs: Input[]) => {
            const formData = validateForm(inputs);
            if(formData) {
                console.log(formData);
            }
        }

        const loginInput: Block = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'login'
            },
            events: {
				focusin: () => this.children.loginInput.toggleError(),
				focusout: () => this.children.loginInput.toggleError(validate(this.children.loginInput).validationError)
            }
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
                rule: 'password'
            },
            events: {
				focusin: () => this.children.passwordInput.toggleError(),
				focusout: () => this.children.passwordInput.toggleError(validate(this.children.passwordInput).validationError)
            }
        });
 
        const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            events: {
                click: (e) => {
                	e.preventDefault();
                	const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                	submitHandler(e, inputs)
                }
            }
        });

        const signUpLink: Block = new Link({
            to: '/signup',
            label: 'Create profile',
            classList: ['my-10']
        });

        this.children = {
			loginInput,
			passwordInput,
			submitButton,
            signUpLink
		}
    }

    render() {
		return this.compile(template, this.props);
    }
}

export default SignIn;
