import chatsApi, {
    CreateChatData,
    GetChatsData,
    DeleteChatData,
    GetUsersData,
    AddDeleteUsersData,
} from '../api/ChatsApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import toastController from './ToastController';
import router from '../router/router';
import store from '../application/Store';

class ChatsController {
    async createChat(data: ICreateChatData): Promise<void | boolean> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.createChat(data);
            if (response.status === 200 && response.response.id > 0) {
                toastController.setInfo(`Chat '${data.title}' created`);
                await this.getChats();
                router.go(`/messenger/${response.response.id}`);
                return true;
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async getChats(data: IGetChatsData = {}): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.getChats(data);
            if (Array.isArray(response.response)) {
                store.set('chatsList', response.response);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async deleteChat(data: IDeleteChatData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.deleteChat(data);
            if (response.status === 200) {
                const newChats = store.getState().chatsList.filter((chat: Record<string, any>) => chat.id !== data.chatId);
                store.set('chatsList', newChats);
                toastController.setInfo('Chat was deleted');
                router.go('/messenger');
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async addUsers(data: IAddDeleteUsersData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.addUsers(data);
            if (response.status === 200 && response.response === 'OK') {
                toastController.setInfo('User added');
                await this.getUsers({ id: data.chatId });
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async getUsers(data: GetUsersData): Promise<Record<string, any> | void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.getUsers(data);
            if (response.status === 200) {
                store.set('currentChat.chatUsers', response.response);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async deleteUsers(data: IAddDeleteUsersData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.deleteUsers(data);
            if (response.status === 200) {
                toastController.setInfo('User was deleted');
                await this.getUsers({ id: data.chatId });
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async getToken(chatId: number){
        const response = await chatsApi.getToken(chatId);
        return response.response.token;
    }
}

const chatsController = new ChatsController();

export default chatsController;
