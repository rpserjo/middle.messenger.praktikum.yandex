import BaseApi from './BaseApi';
import API from './Api';
import {User} from './AuthApi';

export interface UploadAvatarData {
    avatar: File
}

export interface UpdateProfileData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

class UserApi extends BaseApi{
    constructor() {
        super(API.ENDPOINTS.USER.ENDPOINT);
    }

    public uploadAvatar(data: UploadAvatarData): Promise<Record<string, any>>{
        const formData = new FormData();
        formData.append('avatar', data.avatar);
        return this.http.put(API.ENDPOINTS.USER.AVATAR, {
            data: formData,
            multipartForm: true
        });
    }

    public updateProfile(data: UpdateProfileData): Promise<Record<string, any>>{
        return this.http.put(API.ENDPOINTS.USER.PROFILE, {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

const userApi = new UserApi();

export default userApi;
