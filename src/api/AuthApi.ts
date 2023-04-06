import BaseApi from './BaseApi';
import API from './Api.ts';

class AuthApi extends BaseApi {
	constructor(){
		super(API.ENDPOINTS.AUTH);
	}
	
	public signin(data){
		return this.http.post(API.ENDPOINTS.SIGNIN, data);
	}
}

const authApi = new AuthApi();

export default authApi;
