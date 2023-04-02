import Router from '../application/Router';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import ErrorPage from '../pages/error';

const router = new Router('#wrapper');

router.
use('/signin', SignIn).
use('/signup', SignUp).
use('/error_404', ErrorPage, { errorCode: 404, errorMessage: 'Not found' }).
use('/error_500', ErrorPage, { errorCode: 500, errorMessage: 'The page isn`t working', backUrl: '/chat' }).
use('*', ErrorPage, { errorCode: 404, errorMessage: 'Not found' })

export default router;
