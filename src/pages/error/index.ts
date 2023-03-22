import template from './error.hbs';
import './error.css';
import Block from '../../utils/Block';
import Link from '../../components/link';

interface ErrorPageProps{
    errorCode?: number,
    errorMessage?: string
    backUrl?: string
}

class ErrorPage extends Block {
    constructor(props: ErrorPageProps = { errorCode: 404, errorMessage: 'Not found' }) {
        super('div', props, 'ErrorPage');
    }

    created() {
        const backLink = new Link({
            to: (this.props.backUrl) ? this.props.backUrl : '/',
            label: 'Back',
        });

        this.children = { backLink };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ErrorPage;
