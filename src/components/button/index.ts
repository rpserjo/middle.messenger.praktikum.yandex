import template from './button.hbs';
import './button.css';
import Block from '../../utils/Block';

interface ButtonProps {
    id?: string,
    buttonLabel?: string
}
class Button extends Block {
    constructor(props: ButtonProps = {}) {
        super('div', props, 'Button');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Button;
