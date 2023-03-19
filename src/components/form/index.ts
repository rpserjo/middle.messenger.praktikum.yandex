import template from './form.hbs';
import './form.css';
import Block from '../../utils/Block';

/*const form = (params = {}) => template({ ...params });

export default form;*/

class Form extends Block {
    constructor(props) {
        super('div', props, 'Form');
    }

    render(){
        return this.compile(template, this.props);
    }
}

export default Form;
