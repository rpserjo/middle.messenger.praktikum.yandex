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
    async createChat(data: CreateChatData): Promise<void | boolean> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.createChat(data);
            if (response.status === 200 && response.response.id > 0) {
                toastController.setInfo(`Chat '${data.title}' created`);
                const newChats = [
                    {
                        id: response.response.id,
                        avatar: null,
                        created_by: 123,
                        last_message: null,
                        title: data.title,
                        unread_count: 0,
                    },
                    ...store.getState().chats,
                ];
                store.set('chats', newChats);

                router.go(`/messenger/${response.response.id}`);
                return true;
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async getChats(data: GetChatsData = {}): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.getChats(data);
            if (Array.isArray(response.response)) {
                store.set('chats', response.response);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async deleteChat(data: DeleteChatData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.deleteChat(data);
            if (response.status === 200) {
                const newChats = store.getState().chats.filter((chat: Record<string, any>) => chat.id !== data.chatId);
                store.set('chats', newChats);
                toastController.setInfo('Chat was deleted');
                router.go('/messenger');
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async addUsers(data: AddDeleteUsersData): Promise<void> {
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
            console.log(response);
            if (response.status === 200) {
                store.set('currentChatUsers', response.response);
                console.log(store.getState());
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async deleteUsers(data: AddDeleteUsersData): Promise<void> {
        spinnerController.toggle(true);
        try {
            const response = await chatsApi.deleteUsers(data);
            console.log(response);
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
