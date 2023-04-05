import Router from '../application/Router';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import ErrorPage from '../pages/error';
import Chat from '../pages/chat';
import spinnerController from '../controllers/SpinnerController';

const router = new Router('#router-view');

const test = async () => {
    spinnerController.toggle(true);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('timeout')
            spinnerController.toggle(false);
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
