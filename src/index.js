import layout from './layout';
import signin from './pages/signin';
import signup from './pages/signup';
import chat from './pages/chat';
import './index.css';
import error from './pages/error';

let currentPage;
const currentPathname = window.location.pathname;

switch(currentPathname){
    case '/':
    case '/signin':
        currentPage = signin();
        break;
    case '/signup':
        currentPage = signup();
        break;
    case '/chat':
    case '/chat/view':
    case '/chat/profile':
    case '/chat/profile/avatar':
    case '/chat/profile/password':
        currentPage = chat();
        break;
    case '/error_404':
        currentPage = error({code: 404, message: 'Not found'});
        break;
    case '/error_500':
        currentPage = error({code: 500, message: 'The page isn`t working'});
        break;
    default:
        currentPage = error({code: 404, message: 'Not found'});
}

document.querySelector('#root').innerHTML = layout({layout: currentPage});