import userApi, {
    ChangePasswordData, SearchUserData, UpdateProfileData, UploadAvatarData,
} from '../api/UserApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import store from '../application/Store';
import toastController from './ToastController';
import merge from '../application/utils/merge';
import router from '../router/router';

class UserController {
    async uploadAvatar(data: IUploadAvatarData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const { response } = await userApi.uploadAvatar(data);
            if (response) {
                store.set('user', response);
                toastController.setInfo('Avatar updated');
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async updateProfile(data: IUpdateProfileData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const { response } = await userApi.updateProfile(data);
            if (response) {
                const newUserData = merge(store.getState().user, response);
                store.set('user', newUserData);
                toastController.setInfo('Profile info updated');
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async changePassword(data: IChangePasswordData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await userApi.changePassword(data);
            if (response) {
                if (response.status === 200 && response.response === 'OK') {
                    toastController.setInfo('Password changed');
                    router.go('/settings');
                }
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async searchUsers(data: ISearchUserData): Promise<any | void> {
        spinnerController.toggle(true);
        try {
            const response = await userApi.searchUsers(data);
            if (response) {
                if (response.status === 200) {
                    return response.response;
                }
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }
}

const userController = new UserController();

export default userController;
