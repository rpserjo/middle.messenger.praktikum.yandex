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

    /*updated(){
        const sss = () => {
            setTimeout(() => {
                this.setProps({validationError: 'just other'});
            }, 1500)
        }
        console.log('input updated')
        //sss()
    }*/
    
    mounted(){
		/*this.props.childEvents = [
            {
                selector: 'input',
                event: 'focus',
                callback: () => this.validate()
            },
        ]*/
        const validate = (target) => {
            console.log('validate', target)
            //target.setProps({validationError: target.element.querySelector('input').value})
            return 'from validate: ' + target.element.querySelector('input').value
        }
  /**/      this.props.childEvents = [
            {
                selector: 'input',
                event: 'blur',
                callback: () => {
                    this.setProps({validationError: validate(this)})
                    //validate(this);
                }
            },
            /*{
                selector: 'input',
                event: 'focus',
                callback: () => {
                    this.setProps({validationError: ''})
                    //validate(this);
                }
            }*/
        ]
        //this.props.validationError = '123'/**/
	}

/*    validate(){
        console.log('VALIDATION!', this.value, this.props.validation, this);
        //this.setProps({label: 'another label'});
        this.setProps({validationError: this.value})
    }*/
    
    render() {
        return this.compile(template, this.props);
    }
}
export default Input;
