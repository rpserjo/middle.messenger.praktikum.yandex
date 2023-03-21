import template from './link.hbs';
import './link.css';
import Block from '../../utils/Block';

interface LinkProps{
    type?: string,
    to?: string,
    label: string,
    classList?: string[]
}
class Link extends Block {
    constructor(props: LinkProps) {
        super('div', props, 'Link');
    }

    created(){
        const type = this.props.type || 'link';
        const classList = (this.props.classList && Array.isArray(this.props.classList)) ? [...this.props.classList, type].join(' ') : type;
        this.setProps({ classList })
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Link;
