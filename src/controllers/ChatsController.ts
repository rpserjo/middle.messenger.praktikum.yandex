import chatsApi, {CreateChatData, GetChatsData} from '../api/ChatsApi';
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

    //async getToken(chatId: number):
}

const chatsController = new ChatsController();

export default chatsController;
