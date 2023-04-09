import userApi, {ChangePasswordData, UpdateProfileData, UploadAvatarData} from '../api/UserApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import store from '../application/Store';
import toastController from './ToastController';
import merge from '../application/utils/merge';
import router from '../router/router';

class UserController{
    async uploadAvatar(data: UploadAvatarData): Promise<void>{
        spinnerController.toggle(true);
        try{
            console.log(data);
            const { response } = await userApi.uploadAvatar(data);
            if(response){
                store.set('user', response);
                toastController.setInfo('Avatar updated');
            }
        }catch(e){
            errorHandler(e)
        }finally {
            spinnerController.toggle(false);
        }
    }

    async updateProfile(data: UpdateProfileData): Promise<void>{
        spinnerController.toggle(true);
        try{
            const { response } = await userApi.updateProfile(data);
            if(response){
                const newUserData = merge(store.getState().user, response)
                console.log(newUserData)
                store.set('user', newUserData);
                console.log(store.getState())
                toastController.setInfo('Profile info updated');
            }
        }catch(e){
            errorHandler(e);
        }finally {
            spinnerController.toggle(false);
        }
    }

    async changePassword(data: ChangePasswordData): Promise<void>{
        spinnerController.toggle(true);
        try{
            const response = await userApi.changePassword(data);
            if(response){
                console.log(response);
                if(response.status === 200 && response.response === 'OK'){
                    toastController.setInfo('Password changed');
                    router.go('/settings');
                }
            }
        }catch(e){
            errorHandler(e);
        }finally {
            spinnerController.toggle(false);
        }
    }
}

const userController = new UserController();

export default userController;
