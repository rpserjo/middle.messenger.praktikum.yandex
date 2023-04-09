import authApi, {SignInData, SignUpData, User} from '../api/AuthApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import router from '../router/router';
import store from '../application/Store';
import toastController from './ToastController';

class AuthController{
	async signup(data: SignUpData): Promise<void>{
		spinnerController.toggle(true);
		try {
			await authApi.signup(data).then(response => {
				console.log(response)
			});
		}catch(e){
			errorHandler(e);
		}finally{
			spinnerController.toggle(false);
		}
	}

	async signin(data: SignInData): Promise<void>{
		spinnerController.toggle(true);
		try{
			const authResponse = await authApi.signin(data);
			if(authResponse?.response === 'OK'){
				const { response } = await this.user();
				store.set('user', response);
				router.go('/messenger');
				toastController.setInfo('You logged in');
			}
		}catch(e){
			errorHandler(e)
		}finally{
			spinnerController.toggle(false);
		}
	}

	async user(): Promise<any>{
		try{
			const user = await authApi.user();
			store.set('user', user.response);
			return user as User;
		}catch(e){
			console.log('AuthController:user', e);
		}
	}

	async logout(): Promise<void>{
		spinnerController.toggle(true);
		try{
			await authApi.logout().then((response) => {
				if(response.status === 200){
					store.set('user', null);
					console.log('Logout, store', store.getState())
					router.go('/');
					toastController.setInfo('You logged out');
				}
			});
		}catch (e) {
			errorHandler(e)
		} finally {
			spinnerController.toggle(false);
		}
	}

	async check(): Promise<boolean>{
		spinnerController.toggle(true);
		try{
			return authApi.user().then((response) => {
				if(response.status === 200){
					return true;
				}
				return false;
			}).catch(() => false);
		}catch (e) {
			router.go('/error_500');
			return false;
		} finally {
			spinnerController.toggle(false);
		}
	}
}

const authController = new AuthController();

export default authController;
