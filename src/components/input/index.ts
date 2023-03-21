import template from './input.hbs';
import './input.css';
import Block from '../../utils/Block';

interface InputProps {
    type: string,
    id?: string,
    name?: string,
    value?: string,
    label?: string,
    placeholder?: string
}

class Input extends Block {
    constructor(props: InputProps = {type: 'text'}) {
        super('div', props, 'Input');
    }

    get validation(): Record<string, string | boolean | Input> {
        return this.props.validation;
    }

    get value(): string{
		return this.element.querySelector('input')!.value;
    }

    set value(value: string){
        this.element.querySelector('input')!.value = value;
    }
    
    get name(): string{
    	return this.element.querySelector('input')!.name;
    }
    
    toggleError(errorMessage: string = ''): void{
    	this.errorMessage = errorMessage;
		this.element.querySelector('.input-wrapper')!.classList.toggle('has-error', errorMessage.length > 0);
    }
    
	 set errorMessage(value: string){
		this.element.querySelector('p.error-message')!.textContent = value;
    } 
       
    render() {
        return this.compile(template, this.props);
    }
}
export default Input;
