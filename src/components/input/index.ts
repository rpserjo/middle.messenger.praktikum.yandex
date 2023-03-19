import template from './input.hbs';
import './input.css';
import Block from "../../utils/Block";

//const input = (params = {}) => template({ ...params });

class Input extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'Input');
    }

    render() {
        return this.compile(template, this.props);
    }
}
export default Input;
