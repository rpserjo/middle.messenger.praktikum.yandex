import template from './button.hbs';
import './button.css';
import Block from '../../application/Block';
import Icon from '../icon';

interface ButtonProps {
    id?: string,
    icon?: string,
    buttonLabel?: string
    type?: string
    events?: Record<string, Function>,
    classList?: string[]
}
class Button extends Block {
    constructor(props: ButtonProps = {}) {
        super(props, 'Button');
    }

    created() {
        let classes = ['button'];
        if (this.props.classList) classes = [...classes, ...this.props.classList];
        if (this.props.icon) {
            classes.push('button-icon');
            const buttonIcon: Block = new Icon({
                icon: this.props.icon,
            });
            this.children = { buttonIcon };
        }
        this.props.classes = classes.join(' ');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Button;
