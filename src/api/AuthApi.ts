import BaseApi from './BaseApi';
import API from './Api';

/* export interface User {
    id: number,
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
} */

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

class AuthApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.AUTH.ENDPOINT);
    }

    public signup(data: ISignUpData): Promise<Record<string, any>> {
        return this.http.post(API.ENDPOINTS.AUTH.SIGNUP, {
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        });
    }

    public signin(data: ISignInData): Promise<Record<string, any>> {
        return this.http.post(API.ENDPOINTS.AUTH.SIGNIN, {
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        });
    }

    public user(): Promise<Record<string, any>> {
        return this.http.get(API.ENDPOINTS.AUTH.USER, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public logout(): Promise<Record<string, any>> {
        return this.http.post(API.ENDPOINTS.AUTH.LOGOUT);
    }
}

const authApi = new AuthApi();

export default authApi;
