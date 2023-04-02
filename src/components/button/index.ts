import template from './button.hbs';
import './button.css';
import Block from '../../application/Block';
import Icon from '../icon';

interface ButtonProps {
    id?: string,
    icon?: string,
    buttonLabel?: string
    type?: string
    events?: Record<string, Function>
}
class Button extends Block {
    constructor(props: ButtonProps = {}) {
        super('div', props, 'Button');
    }

    created() {
        if (this.props.icon) {
            const buttonIcon: Block = new Icon({
                icon: 'message',
            });
            this.children = { buttonIcon };
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Button;
