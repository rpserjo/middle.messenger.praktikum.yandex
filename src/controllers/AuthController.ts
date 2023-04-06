import authApi from '../api/AuthApi';
import toastController from './ToastController';
import spinnerController from './SpinnerController';

class AuthController{
	private authApi: AuthApi;
	
	async signin(){
		console.log('controller, signin');
		spinnerController.toggle(true);
		try{
			await authApi.signin();
		}catch(e){
			console.log(e)
			toastController.setDanger(e?.error.message || 'Default error message');
		}finally{
			spinnerController.toggle(false);
		}
	}
}

const authController = new AuthController();

export default authController;
