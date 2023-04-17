import template from './error.hbs';
import './error.css';
import Block from '../../application/Block';
import Link from '../../components/link';
import router from '../../router/router';

interface ErrorPageProps{
    errorCode?: number,
    errorMessage?: string
    backUrl?: string
}

class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps = { errorCode: 404, errorMessage: 'Not found' }) {
        super(props, 'ErrorPage');
    }

    created() {
        const backLink = new Link({
            to: (this.props.backUrl) ? this.props.backUrl : '/',
            label: 'Back',
            routerLink: true,
        });

        this.children = { backLink };
    }

    render() {
        return this.compile(template, this.props);
    }

    mounted() {
        console.log('Mounted');
        console.log(router);
        console.log(router.getParams());
    }
}

export default ErrorPage;
