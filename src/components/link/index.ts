import template from './link.hbs';
import './link.css';
import Block from '../../utils/Block';

class Link extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'Link');
    }

    created(){
        const className = this.props.className || 'link';
        this.setProps({className})
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Link;
