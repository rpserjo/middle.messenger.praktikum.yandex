import authApi from '../api/AuthApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import router from '../router/router';
import store from '../application/Store';

export interface SignInData {
	login: string,
	password: string
}

export interface SignUpData {
	first_name: string,
	second_name: string,
	login: string,
	email: string,
	password: string,
	phone: string
}

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
				const user = JSON.parse(response);
				store.set('user', user);
				router.go('/messenger');
			}
		}catch(e){
			errorHandler(e)
		}finally{
			spinnerController.toggle(false);
		}
	}

	async user(): Promise<void>{
		try{
			return authApi.user();
		}catch(e){
			console.log('AuthController:user', e);
		}
	}

	async logout(): Promise<void>{
		spinnerController.toggle(true);
		try{
			await authApi.logout().then((response) => {
				if(response.status === 200){
					router.go('/')
				}
			});
		}catch (e) {
			errorHandler(e)
		} finally {
			spinnerController.toggle(false);
		}
	}

	async check(): Promise<void>{
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
		} finally {
			spinnerController.toggle(false);
		}
	}
}

const authController = new AuthController();

export default authController;
