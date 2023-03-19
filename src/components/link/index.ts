import template from './link.hbs';
import './link.css';
import Block from "../../utils/Block";

const link = (params: Record<string, string> = {}) => {
    const className = params?.className || 'link';

    return template({ ...params, className });
};

class Link extends Block {
    constructor(props: Record<string, any> = {}) {
        const className = props.className || 'link';
        super('div', {...props, className}, 'Link');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Link;
