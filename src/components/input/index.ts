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
    
    created() {

    }
    
    mounted(){
		/*this.props.childEvents = [
            {
                selector: 'input',
                event: 'focus',
                callback: () => this.validate()
            },
        ]*/
        this.props.childEvents = [
            {
                selector: 'input',
                event: 'focus',
                callback: () => this.setProps({validationError: 'error'})
            },
        ]
        this.props.validationError = '123'
	}

    validate(){
        console.log('VALIDATION!', this.value, this.props.validation, this);
        //this.setProps({label: 'another label'});
        this.setProps({validationError: this.value})
    }
    
    render() {
        return this.compile(template, this.props);
    }
}
export default Input;
