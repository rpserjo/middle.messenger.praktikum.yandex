import template from './layout.hbs';
import Block from '../application/Block';
import { Spinner } from '../components/spinner';
import { Toast } from '../components/toast';

class Layout extends Block {
    constructor(props: TProps = {}) {
        super(props);
    }

    created() {
        const spinner = new Spinner({});
        const toast = new Toast({});
        this.children = {
            spinner,
            toast,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Layout;
