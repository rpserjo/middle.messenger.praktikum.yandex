import Router from '../application/Router';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import ErrorPage from '../pages/error';
import Chat from '../pages/chat';

const router = new Router('#wrapper');

const test = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('timeout')
            resolve(true)
        }, 1500)
    });
}

router.
    use({pathname: '/', block: SignIn}).
    use({pathname: '/sign-up', block: SignUp, onBeforeRoute: async () => await test()}).
    use({pathname: '/messenger', block: Chat}).
    use({pathname: '/messenger/:id', block: Chat}).
    use({pathname: '/settings', block: Chat, props: { window: 'settings' }}).
    use({pathname: '/error_404', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' }}).
    use({pathname: '/error_500', block: ErrorPage, props: { errorCode: 500, errorMessage: 'The page isn`t working', backUrl: '/chat' }}).
    use({pathname: '*', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' }})

export default router;
