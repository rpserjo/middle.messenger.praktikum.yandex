import Layout from './layout';
import renderDom from './utils/renderDom';
import './index.css';
import SignIn from './pages/signin';
import Block from './utils/Block';
import Input from "./components/input";

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

/*const layout = new Layout({
    layout: currentPage,
})*/

//const signIn = new SignIn()

/*const input = new Input({
    label: 'Label',
    placeholder: 'Placeholder'
})*/

/*setTimeout(() => {
    input.setProps({label: 'new error'})
}, 1500)*/

renderDom('#root', currentPage);


