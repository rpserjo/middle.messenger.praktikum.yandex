import chatsApi, {CreateChatData, GetChatsData, DeleteChatData} from '../api/ChatsApi';
import spinnerController from './SpinnerController';
import errorHandler from '../application/handlers/errorHandler';
import toastController from './ToastController';
import router from '../router/router';
import store from '../application/Store';

class ChatsController {
    async createChat(data: CreateChatData): Promise<void | boolean>{
        spinnerController.toggle(true);
        try{
            const response = await chatsApi.createChat(data);
            console.log(response, response.status, response.response.id)
            if(response.status === 200 && response.response.id > 0){
                toastController.setInfo(`Chat '${data.title}' created`);
                /*const chats = await this.getChats();
                console.log('CHATS', chats);*/
                const newChats = [                    
                    {
                        id: response.response.id,
                        avatar: null,
                        created_by: 123,
                        last_message: null,
                        title: data.title,
                        unread_count: 0
                    },
                    ...store.getState().chats, 
                ];
                store.set('chats', newChats);
                
                router.go(`/messenger/${response.response.id}`);
                return true;
            }
        }catch(e){
            errorHandler(e);
        }finally {
            spinnerController.toggle(false)
        }
    }

    async getChats(data: GetChatsData = {}): Promise<void>{
        spinnerController.toggle(true);
        try{
            const response = await chatsApi.getChats(data);
            if(Array.isArray(response.response)){
                store.set('chats', response.response);
            }
        }catch(e){
            errorHandler(e);
        }finally {
            spinnerController.toggle(false)
        }
    }
    
    async deleteChat(data: DeleteChatData): Promise<void>{
        console.log('Controller, delete', data)
        spinnerController.toggle(true);
        try{
            const response = await chatsApi.deleteChat(data);
            if(response.status === 200){
                const newChats = store.getState().chats.filter(chat => chat.id !== data.chatId);
                store.set('chats', newChats);
                toastController.setInfo('Chat was deleted');
                router.go('/messenger');
            }
        }catch(e){
            errorHandler(e);
        }finally{
            spinnerController.toggle(false);
        }
    }

    //async getToken(chatId: number):
}

const chatsController = new ChatsController();

export default chatsController;
