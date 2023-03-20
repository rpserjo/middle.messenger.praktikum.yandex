import Layout from './layout';
import renderDom from './utils/renderDom';
import './index.css';
import SignIn from './pages/signin';
import Block from './utils/Block';

let currentPage: Block | string;
const currentPathname: string = window.location.pathname;

switch (currentPathname) {
    case '/':
    case '/signin':
        const signInPage: Block = new SignIn();
        currentPage = signInPage;
        break;
    default:
        currentPage = '404'
}

const layout = new Layout({
    layout: currentPage,
})

renderDom('#root', layout);
