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

class ChatsApi extends BaseApi {
    constructor() {
        super(API.ENDPOINTS.CHAT.ENDPOINT);
    }

    public createChat(data: CreateChatData): Promise<Record<string, any>>{
        return this.http.post('', {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public getChats(data: GetChatsData): Promise<Record<string, any>>{
        return this.http.get('', {
            data
        });
    }
    
    public deleteChat(data: DeleteChatData): Promise<Record<string, any>>{
        return this.http.delete('', {
           data,
           headers: {
                'Content-Type': 'application/json'
            } 
        });
    }

    public getToken(chatId: number): Promise<Record<string, any>>{
        return this.http.post(API.ENDPOINTS.CHAT.TOKEN + '/' + chatId);
    }
}

const chatsApi = new ChatsApi();

export default chatsApi;
