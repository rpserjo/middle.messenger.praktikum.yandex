import template from './signin.hbs';
import Block from '../../utils/Block';
import './singin.css';
import Form from '../../components/form';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from "../../components/link";
import validate from "../../utils/validate";

const validate = (input: Input) => {
	//console.log('validate', input);
	const value: string = input.value;
	const validation: Record<string, string | boolean> = input.props.validation;
	//console.log('VALIDATE', value, validation)
	const rules = {
		login: {
			pattern: '^[a-zA-Z0-9]{3,20}$',
			errorMessage: 'Login should contain only letters and be from 3 to 20 letters length'	
		},
		password: {
			pattern: '^.{6,30}$',
			errorMessage: 'Password should be at least 6-letters length'
		},
		name: {
			pattern: '(^[A-Z]{1}[a-z\\-]{1,14}$)',
			errorMessage: 'First capital, max 14 letters'					
		},
		email: {
			pattern: '[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}',
			errorMessage: 'Wrong email'		
		}
	}
	
	/*let isValid: boolean;
	let validationError: string;*/
	const validationStatus = { isValid: false, validationError: '' };
	if(validation?.required === true && value.length === 0){
		validationStatus.isValid = false;
		validationStatus.validationError = 'Required field';
		return validationStatus;
	}
	if(validation?.rule){
		if(rules[validation.rule]){
			//console.log('Test', value, rules[validation.rule].pattern);		
			const regexp = new RegExp(rules[validation.rule].pattern, 'g');
			//console.log('Test result', regexp.test(value));
			if(!regexp.test(value)){
				//console.log('fail')
				validationStatus.isValid = false;
				validationStatus.validationError = rules[validation.rule].errorMessage;
			}else{
				//console.log('success')
				validationStatus.isValid = true;
				validationStatus.validationError = '';
			}
		}else{
			validationStatus.isValid = false;
			validationStatus.validationError = 'Validation rule is missing';
			//console.log('No rule', validation.rule);		
		}
	}
	//console.log('Validation status', isValid)
	
	return validationStatus;
}

class SignIn extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'SignIn');
    }

    created() {
        const submitHandler = (e: Event, inputs: Input[]) => {
				const formValidation: Set<boolean> = new Set<boolean>;
				const formData = {};      		
        		inputs.forEach((input: Input) => {
        			//console.log(input.value, input.props.validation, validate(input))
        			const status = validate(input);
        			if(status.isValid){
						formValidation.add(true);
						formData[input.name]	= input.value;
						input.toggleError();	
        			}else{
						formValidation.add(false);
						input.toggleError(status.validationError);        			
        			}        			
        		});
        		//console.log('DATA', formValidation, formData)
        		if(!formValidation.has(false) && formValidation.has(true)){
					console.log(formData)        		
        		}
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
                rule: 'email'
            },
            events: {
					focusin: () => {
						/*(this.children.loginInput).errorMessage = '';
						this.children.loginInput.element.querySelector('.input-wrapper')?.classList.toggle('has-error', false);*/
						this.children.loginInput.toggleError();
					},
					focusout: () => {
						/*this.children.loginInput.errorMessage = validate(this.children.loginInput).validationError;
						console.log(this.children.loginInput)
						this.children.loginInput.element.querySelector('.input-wrapper')?.classList.toggle('has-error', true);*/
						this.children.loginInput.toggleError(validate(this.children.loginInput).validationError);
					}
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
            },
            events: {
					focusin: () => (this.children.passwordInput).errorMessage = '',
					focusout: () => (this.children.passwordInput).errorMessage = validate(this.children.passwordInput).validationError,
            }
        });
 
        const submitButton: Block = new Button({
            buttonLabel: 'Sign In',
            events: {
                click: (e) => {
                	e.preventDefault();
                	const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                	//console.log(inputs);
                	submitHandler(e, inputs)
                }
            }
        });

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
        this.children.submitButton = submitButton;
    }

    render() {
        /*setTimeout(() => {
            this.children.passwordInput.setProps({validationError: 'another', label: 'label'})
        }, 2000)*/
        return this.compile(template, this.props);
    }
}

export default SignIn;
