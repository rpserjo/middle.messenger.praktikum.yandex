import Router from '../application/Router';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import ErrorPage from '../pages/error';
import Chat from '../pages/chat';
import authController from '../controllers/AuthController';
import Messenger from '../pages/messenger';
import store from '../application/Store';

const checkNotAuth = () => {
    return store.getState().user === null;
}

const checkIsAuth = () => {
    return store.getState().user !== null;
}

const router = new Router('#router-view');
window.addEventListener('DOMContentLoaded', async () => {
    await authController.user();
    router.
        use({pathname: '/', block: SignIn, routeGuard: {guard: checkNotAuth, redirect: '/messenger'}}).
        use({pathname: '/sign-up', block: SignUp, routeGuard: {guard: checkNotAuth, redirect: '/messenger'}}).
        use({pathname: '/messenger', block: Messenger, routeGuard: {guard: checkIsAuth, redirect: '/'}}).
        use({pathname: '/messenger/:id', block: Messenger, routeGuard: {guard: checkIsAuth, redirect: '/'}}).
        use({pathname: '/settings', block: Messenger, props: { window: 'settings' }, routeGuard: {guard: checkIsAuth, redirect: '/'}}).
            //use({pathname: '/error_404', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' }}).
        use({pathname: '/error_500', block: ErrorPage, props: { errorCode: 500, errorMessage: 'The page isn`t working', backUrl: '/chat' }}).
        use({pathname: '*', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' }}).
        start();
});

export default router;
