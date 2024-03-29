import chatsApi from '../api/ChatsApi';
import resourceApi from '../api/ResourceApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import toastController from './ToastController';
import router from '../router/router';
import store from '../application/Store';
import messengerController from './MessengerController';

class ChatsController {
    async createChat(data: ICreateChatData): Promise<void | boolean | undefined> {
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
                store.set('filteredChatsList', response.response);
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

    async getUsers(data: IGetUsersData): Promise<Record<string, any> | void> {
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

    async getToken(chatId: number): Promise<string> {
        const response = await chatsApi.getToken(chatId);
        return response.response.token;
    }

    async uploadAvatar(data: IUploadChatAvatar): Promise<void> {
        spinnerController.toggle(true);
        try {
            const { response } = await chatsApi.uploadChatAvatar(data);
            if (response) {
                store.set('currentChat.avatar', response.avatar);
                const chats = store.getState().chatsList;
                store.set('chatsList', chats.map((chat: IChatElement) => {
                    if (chat.id === response.id) {
                        return { ...chat, avatar: response.avatar };
                    }
                    return chat;
                }));
                toastController.setInfo('Chat avatar updated');
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async uploadImage(data: File): Promise<void | any> {
        spinnerController.toggle(true);
        try {
            const { response } = await resourceApi.uploadImage(data);
            if (response) {
                return response;
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            spinnerController.toggle(false);
        }
    }

    async uploadImages(files: File[]): Promise<void> {
        const images: number[] = [];
        for (const file of files) {                         // eslint-disable-line
            const response = await this.uploadImage(file);  // eslint-disable-line
            images.push(response.id);
        }
        store.set('filesToSend', null);
        images.forEach((id: number) => {
            messengerController.sendFile(id);
        });
        images.length = 0;
    }
}

const chatsController = new ChatsController();

export default chatsController;
