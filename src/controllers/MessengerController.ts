class MessengerController {
    private webSocket: WebSocket;
    
    private userId: number;
    
    private chatId: number;
    
    private token: string;
    
    private ping;
    
    public connect(options) {
        this.userId = options.userId;
        this.chatId = options.chatId;
        this.token = options.token;
        
        this.webSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);
        
        this.webSocket.addEventListener('open', () => {
            console.log('WS connected');
            this.sendMessage('test message');
        });
        
        this.webSocket.addEventListener('message', (event) => {
            console.log('WS New message received', event.data);
        });



        this.webSocket.addEventListener('close', (event: CloseEvent) => {
            if(event.wasClean){
                console.log(`WS Connection in chat #${this.chatId} was closed`);
            }else{
                console.log('WS Network error');
            }
            console.log(`WS Code: ${event.code} | Reason: ${event.reason}`);
        });
        
        this.ping = setInterval(() => {
            /*this.webSocket.send(JSON.stringify({
                content: 'ping',
                type: 'ping'
            }));*/
            this.sendMessage('', 'ping')
        }, 10000);
    }
    
    public sendMessage(message: string, type: string = 'message'){
        this.webSocket.send(JSON.stringify({
            content: message,
            type
        }));
    }
}

const messengerController = new MessengerController();

export default messengerController;
