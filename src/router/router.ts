import Router from '../application/Router';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import ErrorPage from '../pages/error';
import authController from '../controllers/AuthController';
import Messenger from '../pages/messenger';
import store from '../application/Store';
import chatsController from '../controllers/ChatsController';

const checkNotAuth = () => {
    return store.getState().user === null;
};

const checkIsAuth = () => {
    return store.getState().user !== null;
};

const onMessengerRoute = () => {
    store.set('currentChat', {
        id: null,
        title: null,
        avatar: null,
        chatUsers: [],
        messages: []
    })
}

const onBeforeChatRoute = async () => {
    if(store.getState().chatsList.length === 0){
        await chatsController.getChats();        
    }

    store.set('currentChat', {
        id: parseInt(router.getParams().id, 10),
        title: store.getState().chatsList.find((chat: IChatElement) => chat.id === parseInt(router.getParams().id, 10))?.title || undefined,
        messages: [],
        avatar: null,
    });
    await chatsController.getUsers({id: parseInt(router.getParams().id, 10) });
    
    
}

const onRouteCallback2 = () => {
    //setTimeout(() => store.set('currentChat.id', parseInt(router.getParams().id, 10) || null), 0);
    console.log('onRoute', router.getParams().id);
    store.set('currentChat', {
        id: parseInt(router.getParams().id, 10),
        title: store.getState().chatsList.find((chat: IChatElement) => chat.id === parseInt(router.getParams().id, 10))?.title || undefined
    });
};

const router = new Router('#router-view');
window.addEventListener('DOMContentLoaded', async () => {
    await authController.user();
    router
        .use({ pathname: '/', block: SignIn, routeGuard: { guard: checkNotAuth, redirect: '/messenger' } })
        .use({ pathname: '/sign-up', block: SignUp, routeGuard: { guard: checkNotAuth, redirect: '/messenger' } })
        .use({ pathname: '/messenger', block: Messenger, props: { window: 'chat' }, onRoute: onMessengerRoute, routeGuard: { guard: checkIsAuth, redirect: '/' } })
        .use({ pathname: '/messenger/:id', block: Messenger, props: { window: 'chat' }, onBeforeRoute: onBeforeChatRoute, routeGuard: { guard: checkIsAuth, redirect: '/' } })
        .use({ pathname: '/settings', block: Messenger, props: { window: 'profile' }, routeGuard: { guard: checkIsAuth, redirect: '/' } })
        .use({ pathname: '/settings/password', block: Messenger, props: { window: 'password' }, routeGuard: { guard: checkIsAuth, redirect: '/' } })
        .use({ pathname: '/error_500', block: ErrorPage, props: { errorCode: 500, errorMessage: 'The page isn`t working', backUrl: '/chat' } })
        .use({ pathname: '*', block: ErrorPage, props: { errorCode: 404, errorMessage: 'Not found' } })
        .start();
});

export default router;
