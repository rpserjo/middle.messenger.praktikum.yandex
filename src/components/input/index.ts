import template from './input.hbs';
import './input.css';
import Block from '../../utils/Block';

class Input extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'Input');
    }
    
    get value(){
		return this.element.querySelector('input').value;
    }

    set value(value: string){
        this.element.querySelector('input').value = value;
    }
    
    get name(){
    	return this.element.querySelector('input').name;
    }
    
    toggleError(errorMessage: string = ''){
    	this.errorMessage = errorMessage;
		this.element.querySelector('.input-wrapper')?.classList.toggle('has-error', errorMessage.length > 0);    
    }
    
	 set errorMessage(value: string = ''){
		const errorM = this.element.querySelector('p.error-message').innerText = value;
    } 
       
    render() {
        return this.compile(template, this.props);
    }
}
export default Input;
