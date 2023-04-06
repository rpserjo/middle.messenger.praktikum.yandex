import BaseApi from './BaseApi';
import API from './Api';
import {SignInData, SignUpData} from '../controllers/AuthController';

class AuthApi extends BaseApi {
	constructor(){
		super(API.ENDPOINTS.AUTH);
	}

	public signup(data: SignUpData): Promise<Record<string, any>>{
		console.log('AuthApi:signup', data)
		return this.http.post(API.ENDPOINTS.SIGNUP,{
			headers: {
				'Content-Type': 'application/json'
			},
			data
		});
	}

	public signin(data: SignInData): Promise<Record<string, any>>{
		console.log('AuthApi', data)
		return this.http.post(API.ENDPOINTS.SIGNIN, {
			headers: {
				'Content-Type': 'application/json'
			},
			data
		});
	}

	public user(): Promise<Record<string, any>>{
		return this.http.get(API.ENDPOINTS.USER, {
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

	public logout(): Promise<Record<string, any>>{
		return this.http.post(API.ENDPOINTS.LOGOUT);
	}
}

const authApi = new AuthApi();

export default authApi;
