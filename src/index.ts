/*
import layout from './layout';
import './index.css';
import signin from './pages/signin';
import signup from './pages/signup';
import chat from './pages/chat';
import error from './pages/error';

let currentPage: string;
const currentPathname: string = window.location.pathname;

switch (currentPathname) {
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
    currentPage = error({ code: 404, message: 'Not found' });
    break;
case '/error_500':
    currentPage = error({ code: 500, message: 'The page isn`t working' });
    break;
default:
    currentPage = error({ code: 404, message: 'Not found' });
}

document.querySelector('#root').innerHTML = layout({ layout: currentPage });
*/
/*
import Block from './utils/Block';
import renderDom from './utils/renderDom';

class Button extends Block {
    constructor(props: Record<string, any>) {
        super('div', props);
    }

    render() {
        return this.compile(`<button>{{{ text }}}</button>`, this.props);
    }
}

class MyBlock extends Block {
    constructor(props: Record<string, any>) {
        super('div', props);
    }

    render() {
        //return this.compile(`<div>{{{ text }}}</div><div>{{ button }}</div>`, {text: this.props.text});
        return this.compile(`<div>{{{ text }}}</div><div>{{{ button }}}</div><div>{{{ button2 }}}</div>`,{
            text: this.props.text,
            button: this.props.button,
            button2: this.props.button2
        });
    }
}
const button = new Button({text: 'Button text'});
const button2 = new Button({text: 'Button2 text', events: {click: () => {button.props.text = 'clicked'}}});
const div = new MyBlock({
    text: 'My text',
    button,
    button2,
    events: {
        click: () => button2.props.text = 'clicked'
    }
})
console.log(div)
const test: string = 123;
*/
import Layout from './layout';
import renderDom from './utils/renderDom';
import './index.css';
import SignIn from "./pages/signin";
import Block from "./utils/Block";

let currentPage: Block | string;
const currentPathname: string = window.location.pathname;

switch (currentPathname) {
    case '/':
    case '/signin':
        const signInPage: Block = new SignIn();
        currentPage = signInPage;
        break;
    default:
        currentPage = '404'//error({ code: 404, message: 'Not found' });
}

//console.log('current', currentPage)
const layout = new Layout({
    layout: currentPage,
})
renderDom('#root', layout);
