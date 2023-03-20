import template from './input.hbs';
import './input.css';
import Block from "../../utils/Block";

//const input = (params = {}) => template({ ...params });

const validate = (target, rules) => {
	console.log('VALIDATION!', target, rules);
	
	target.props.validationError = '333';
}

class Input extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'Input');
    }
    
    get value(){
		return this.element.querySelector('input').value;    
    }
    
    created() {
    	this.props.validationError = '111';
    	//this.setProps({validationError: 'error'})
    	if(this.props.validation){
    		this.props.childEvents = [
    			{
					selector: 'input',
					event: 'focus',
					callback: () => validate(this, this.props.validation)//this.setProps({validationError: 'focus'})//;validation(e, this.props.validation) || () => validation(e.target.value, this.props.validation)
    			},
    			/*{
					selector: 'input',
					event: 'blur',
					callback: () => this.props.validationError = 'blur'//this.setProps({validationError: 'blur'})//{console.log('this', this); this.setProps({validationError: validation(e, this.props.validation)})}	
    			}*/
    		]
    	}
    }
    
    mounted(){
    	/*if(this.props.validation){
			console.log(this.name, 'Has validation rules', this.props.validation);
			console.log(this.element)
			//this.element.querySelector('input').addEventListener('focus', (e) => validate(e.target.value, this.props.validation));
			//validate(this.element.querySelector('input')?.value, this.props.validation);  	
    	}*/
    }
    
    render() {
        return this.compile(template, this.props);
    }
}
export default Input;
