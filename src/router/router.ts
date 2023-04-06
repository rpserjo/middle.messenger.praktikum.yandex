import Router from '../application/Router';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import ErrorPage from '../pages/error';
import Chat from '../pages/chat';
import authController from '../controllers/AuthController';
import Messenger from '../pages/messenger';

const checkNotAuth = async () => {
    return !await authController.check();
}

const checkAuth = async () => {
    return await authController.check();
}

const router = new Router('#router-view');
router.
    use({pathname: '/', block: SignIn, routeGuard: {guard: checkNotAuth, redirect: '/messenger'}}).
    use({pathname: '/sign-up', block: SignUp, routeGuard: {guard: checkNotAuth, redirect: '/messenger'}}).
    use({pathname: '/messenger', block: Messenger, routeGuard: {guard: checkAuth, redirect: '/'}}).
    use({pathname: '/messenger/:id', block: Chat, routeGuard: {guard: checkAuth, redirect: '/'}}).
    use({pathname: '/settings', block: Chat, props: { window: 'settings' }, routeGuard: {guard: checkAuth, redirect: '/'}}).
    //use({pathname: '/error_404', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' }}).
    use({pathname: '/error_500', block: ErrorPage, props: { errorCode: 500, errorMessage: 'The page isn`t working', backUrl: '/chat' }}).
    use({pathname: '*', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' }})

export default router;
