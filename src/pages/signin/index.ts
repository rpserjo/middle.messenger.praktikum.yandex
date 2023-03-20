/*import template from './signin.hbs';
import './singin.css';
import form from '../../components/form';
import input from '../../components/input';
// import button from '../../components/button';
import link from '../../components/link';

const signin = () => {
    const formLabel = 'Sign In';
    const formData = [
        input({
            id: 'login', label: 'Login', name: 'login', placeholder: 'Login', type: 'text', value: '', classList: 'my-10',
        }),
        input({
            id: 'password', label: 'Password', name: 'password', placeholder: 'Password', type: 'password', value: '',
        }),
        link({ to: '/chat', label: 'Sign in', className: 'button' }),
        link({ to: '/signup', label: 'Create profile' }),
    ];
    const formTemplate = form({ formLabel, formData });

    return template({ form: formTemplate });
};

export default signin;*/

import template from './signin.hbs';
import Block from '../../utils/Block';
import './singin.css';
import Form from "../../components/form";
import Input from "../../components/input";
import Button from "../../components/button";
import Link from "../../components/link";
import validate from "../../utils/validate";

class SignIn extends Block {
    constructor(props: Record<string, any> = {}) {
        /*const loginInput: Block = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            value: '',
            classList: 'my-10',
        });
        const passwordInput: Block = new Input({
            id: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Password',
            type: 'password',
            value: '',
            childEvents: [
                {
                    selector: 'input',
                    event: 'focus',
                    callback: () => validate(this)
                }
            ]
        });
        const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            events: {
                click: () => document.location.pathname = '/chat'
            }
        });
        */
        /*const link: Block = new Link({
            to: '/signup',
            label: 'Create profile'
        });

        props = { ...props, link};*/

        super('div', props, 'SignIn');
    }

    created() {
    
    		const submitHandler = (e) => {
				e.preventDefault();
				console.log('SUBMIT', e);
				console.log(this)    		
    		}
    		
    		const validate = (e) => {
    			console.log('VALIDATE', e);
				console.log(this) 
    		}
    		
    		const loginInput: Block = new Input({
            id: 'login',
            label: 'Login',
            name: 'login',
            placeholder: 'Login',
            type: 'text',
            value: '',
            classList: 'my-10',
        });
        const passwordInput: Block = new Input({
            id: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Password',
            type: 'password',
            value: '',
            /*childEvents:[
					{
						selector: 'input',
						event: 'focus',
						callback: () => this.children.passwordInput.validate()				
					}            
            ],*/
            validation: {
					required: true,
					rule: 'password'            
            }
        });
        const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            events: {
                click: submitHandler
            }
        });
        
        const form = new Form({
        		formLabel: 'Sign in',
        		formData:[loginInput, passwordInput, submitButton]
			})
			
			this.children.signInForm = form;
        //console.log(this.name, 'Created', this.children)
        //this.children = {...this.children, submitButton}
        /*this.setProps({
            submitButton,
            children: {
                submitButton
            }
        })*/
        //console.log(this.name, 'Created', this.children)
        
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default SignIn;
