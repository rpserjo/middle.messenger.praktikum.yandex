import template from './layout.hbs';
import './layout.css';
import Block from '../utils/Block';

class Layout extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, 'Layout');
    }

    render() {
        return this.compile(template, this.props);
    }
}
export default Layout;
