import template from './link.hbs';
import './link.css';
import Block from '../../application/Block';

interface LinkProps{
    type?: string,
    to?: string,
    label: string,
    classList?: string[] | string,
    events?: Record<string, Function>
}
class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props, 'Link');
    }

    created() {
        const type = this.props.type || 'link';
        const classList = (this.props.classList && Array.isArray(this.props.classList)) ? [...this.props.classList, type].join(' ') : type;
        this.setProps({ classList });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Link;
