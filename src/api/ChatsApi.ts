import BaseApi from './BaseApi';
import API from './Api';

class ChatsApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.CHAT.ENDPOINT);
    }

    public createChat(data: ICreateChatData): Promise<Record<string, any>> {
        return this.http.post('', {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public getChats(data: IGetChatsData): Promise<Record<string, any>> {
        return this.http.get('', {
            data,
        });
    }

    public deleteChat(data: IDeleteChatData): Promise<Record<string, any>> {
        return this.http.delete('', {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public getToken(chatId: number): Promise<Record<string, any>> {
        return this.http.post(`${API.ENDPOINTS.CHAT.TOKEN}/${chatId}`);
    }

    public addUsers(data: IAddDeleteUsersData): Promise<Record<string, any>> {
        return this.http.put(API.ENDPOINTS.CHAT.USERS, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public getUsers(data: IGetUsersData): Promise<Record<string, any>> {
        return this.http.get(`/${data.id}${API.ENDPOINTS.CHAT.USERS}`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public deleteUsers(data: IAddDeleteUsersData): Promise<Record<string, any>> {
        return this.http.delete(API.ENDPOINTS.CHAT.USERS, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public uploadChatAvatar(data: IUploadChatAvatar): Promise<Record<string, any>> {
        const formData = new FormData();
        formData.append('chatId', data.chatId);
        formData.append('avatar', data.avatar);
        return this.http.put(API.ENDPOINTS.CHAT.AVATAR, {
            data: formData,
            multipartForm: true,
        });
    }
}

const chatsApi = new ChatsApi();

export default chatsApi;
