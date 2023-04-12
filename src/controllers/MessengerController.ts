import store from '../application/Store';

class MessengerController {
    private webSocket: WebSocket;
    
    private userId: number;
    
    private chatId: number;
    
    private token: string;
    
    private ping;
    
    public async connect(options) {
        console.log('WS connect check', this.webSocket !== undefined);
        if(this.webSocket !== undefined){
            const close = await this.close();
            console.log('WS was closed', close)
        }
        
        this.userId = options.userId;
        this.chatId = options.chatId;
        this.token = options.token;
        
        
        
        this.webSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);
        
        
        this.webSocket.addEventListener('open', () => {
            console.log(`WS #${this.chatId} connected`);
            //this.sendMessage('test message');
            this.fetchMessages();
        });
        
        this.webSocket.addEventListener('message', (event) => {
            console.log(`WS #${this.chatId} New message received`, event.data);
            const data = JSON.parse(event.data);
            console.log('WS data', data)
            if(Array.isArray(data)){
                store.set('currentChat.messages', data);
                console.log('STATE', store.getState());
            }else if(data.type === 'message'){
                console.log('WS single message')
                store.set('currentChat.messages', [
                    data,
                    ...store.getState().currentChat.messages
                ]);
            }
            
        });
        
        this.webSocket.addEventListener('close', (event: CloseEvent) => {
            console.log(`WS #${this.chatId}`, event)
            if(event.wasClean){
                console.log(`WS #${this.chatId} connection was closed`);
            }else{
                console.log(`WS #${this.chatId} network error`);
            }
            console.log(`WS #${this.chatId} | Code: ${event.code} | Reason: ${event.reason}`);
            //resolve(true);
        });
        
        this.ping = setInterval(() => {
            this.webSocket.send(JSON.stringify({
                type: 'ping'
            }));
            //this.sendMessage('', 'ping')
        }, 10000);
    }
    
    public send(content: string, type: string = 'message'){
        this.webSocket.send(JSON.stringify({
            content,
            type
        }));
    }
    
    public sendMessage(content: string) {
        this.send(content, 'message');
    }
    
    public async close(){
        console.log(`WS ${this.chatId} close request`);
        /*if(!this.webSocket) return;
        return await this.webSocket.close();//.then(() => resolve());*/
        return new Promise((resolve, reject) => {
            if(!this.webSocket) {
                console.log('WS no socket');
                resolve(true);
            }
            const cl = clearInterval(this.ping);
            //console.log(`WS ping cleared ${cl}`);
            this.webSocket.addEventListener('close', resolve(true)) 
            //console.log('WS CLOSE', this.webSocket.close())
        });
    }
    
    public fetchMessages(offset: number = 0) {
        this.send(`${offset}`, 'get old')
    }
}

const messengerController = new MessengerController();

export default messengerController;
