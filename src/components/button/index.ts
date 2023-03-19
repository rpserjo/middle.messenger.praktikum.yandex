import template from './button.hbs';
import './button.css';
import Block from "../../utils/Block";

//const button: Function = (params = {}) => template({ ...params });
class Button extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'Button');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Button;
