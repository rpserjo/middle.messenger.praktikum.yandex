import BaseApi from './BaseApi';
import API from './Api';

export interface CreateChatData {
    title: string
}

export interface GetChatsData{
    offset?: number,
    limit?: number,
    filter?: string
}

export interface DeleteChatData{
    chatId: number,
}

export interface AddDeleteUsersData{
    users: number[],
    chatId: number
}

export interface GetUsersData {
    id: number,
    offset?: number,
    limit?: number,
    name?: string,
    email?: string
}

class ChatsApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.CHAT.ENDPOINT);
    }

    public createChat(data: CreateChatData): Promise<Record<string, any>> {
        return this.http.post('', {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public getChats(data: GetChatsData): Promise<Record<string, any>> {
        return this.http.get('', {
            data,
        });
    }

    public deleteChat(data: DeleteChatData): Promise<Record<string, any>> {
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

    public addUsers(data: AddDeleteUsersData): Promise<Record<string, any>> {
        return this.http.put(API.ENDPOINTS.CHAT.USERS, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public getUsers(data: GetUsersData): Promise<Record<string, any>> {
        return this.http.get(`/${data.id}${API.ENDPOINTS.CHAT.USERS}`, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public deleteUsers(data: AddDeleteUsersData): Promise<Record<string, any>> {
        return this.http.delete(API.ENDPOINTS.CHAT.USERS, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

const chatsApi = new ChatsApi();

export default chatsApi;
