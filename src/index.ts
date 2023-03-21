import renderDom from './utils/renderDom';
import './index.css';
import Block from './utils/Block';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import ErrorPage from './pages/error';

let currentPage: Block;
const currentPathname: string = window.location.pathname;

switch (currentPathname) {
    case '/':
    case '/signin':
        currentPage = new SignIn();
        break;
    case '/signup':
        currentPage = new SignUp();
        break;
    case '/error_500':
        currentPage = new ErrorPage({
            errorCode: 500,
            errorMessage: 'The page isn`t working',
            backUrl: '/chats'
        });
        break;
    default:
        currentPage = new ErrorPage();
}

renderDom('#wrapper', currentPage);
