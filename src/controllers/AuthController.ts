import authApi from '../api/AuthApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import router from '../router/router';
import store from '../application/Store';
import toastController from './ToastController';

class AuthController {
    async signup(data: ISignUpData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await authApi.signup(data);
            if (response.status === 200 && response.response.id > 0) {
                toastController.setInfo('Profile created');
                setTimeout(() => {
                    router.go('/messenger');
                }, 1000);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async signin(data: ISignInData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const authResponse = await authApi.signin(data);
            if (authResponse?.response === 'OK') {
                await this.user();
                router.go('/messenger');
                toastController.setInfo('You logged in');
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async user(): Promise<IUser | undefined> {
        try {
            const user = await authApi.user();
            store.set('user', user.response);
            return user as IUser;
        } catch (e) {
            console.log('AuthController:user', e);
        }
    }

    async logout(): Promise<void> {
        spinnerController.toggle(true);
        try {
            await authApi.logout().then((response) => {
                if (response.status === 200) {
                    store.set('user', null);
                    router.go('/');
                    toastController.setInfo('You logged out');
                }
            });
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async check(): Promise<boolean> {
        spinnerController.toggle(true);
        try {
            return authApi.user().then((response) => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            }).catch(() => false);
        } catch (e) {
            router.go('/error_500');
            return false;
        } finally {
            spinnerController.toggle(false);
        }
    }
}

const authController = new AuthController();

export default authController;
