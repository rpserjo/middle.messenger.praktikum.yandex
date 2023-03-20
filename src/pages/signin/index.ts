import template from './signin.hbs';
import Block from '../../utils/Block';
import './singin.css';
import Form from '../../components/form';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from "../../components/link";
import validate from "../../utils/validate";

class SignIn extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'SignIn');
    }

    created() {
        const submitHandler = (e) => {
            e.preventDefault();
            console.log('SUBMIT', e);
            console.log(this, this.children.signInForm.children.formData.filter(el => el instanceof Input))
            this.children.signInForm.children.formData.filter(el => el instanceof Input).forEach(input => {
               input.setProps({validationError: 'submit'})
            });
        }

        const loginInput: Block = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            value: '',
            classList: 'my-10',
            validation: {
                required: true,
                rule: 'password'
            }
        });

        const passwordInput: Block = new Input({
            id: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Password',
            type: 'password',
            value: 'mypass',
            validation: {
                required: true,
                rule: 'password'
            }
        });

        /*const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            events: {
                click: submitHandler
            }
        });*/

/*        setTimeout(() => {
            passwordInput.setProps({errorMessage: 'another', label: 'label'})
        }, 3000)*/
        /*
        const registerLink = new Link({
            to: '/signup',
            label: 'Create account'
        })
        
        const form = new Form({
            formLabel: 'Sign in',
            formData:[loginInput, passwordInput, submitButton, registerLink]
        });*/
			
        this.children.loginInput = loginInput;
        this.children.passwordInput = passwordInput;
    }

    render() {
        /*setTimeout(() => {
            this.children.passwordInput.setProps({validationError: 'another', label: 'label'})
        }, 2000)*/
        return this.compile(template, this.props);
    }
}

export default SignIn;
