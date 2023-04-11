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
            console.log('WSS connected');
            this.sendMessage('test message');
        });
        
        this.webSocket.addEventListener('message', (event) => {
            console.log('New message received', event.data);
        });
        
        this.ping = setInterval(() => {
            this.webSocket.send('');
        }, 10000);
    }
    
    public sendMessage(message: string){
        this.webSocket.send(JSON.stringify({
            content: message,
            type: 'message'
        }));
    }
}

const messengerController = new MessengerController();

export default messengerController;
