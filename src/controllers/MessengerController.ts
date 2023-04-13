import store from '../application/Store';

export interface SocketOptions {
    userId: number,
    chatId: number,
    token: string
}

class MessengerController {
    private webSocket: WebSocket | null = null;

    private userId: number;

    private chatId: number;

    private token: string;

    private ping: number;

    public async connect(options: SocketOptions) {
        if (this.webSocket !== null) {
            await this.close();
        }

        this.userId = options.userId;
        this.chatId = options.chatId;
        this.token = options.token;

        this.webSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);

        this.webSocket.addEventListener('open', () => {
            this.fetchMessages();
        });

        this.webSocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
                store.set('currentChat.messages', data);
            } else if (data.type === 'message') {
                store.set('currentChat.messages', [
                    data,
                    ...store.getState().currentChat.messages,
                ]);
            }
        });

        this.webSocket.addEventListener('close', (event: CloseEvent) => {
            if (event.wasClean) {
                console.log(`WS #${this.chatId} connection was closed`);
            } else {
                console.log(`WS #${this.chatId} network error`);
            }
            console.log(`WS #${this.chatId} | Code: ${event.code} | Reason: ${event.reason}`);
        });

        this.ping = setInterval(() => {
            this.webSocket.send(JSON.stringify({
                type: 'ping',
            }));
        }, 10000);
    }

    public send(content: string, type: string = 'message') {
        this.webSocket.send(JSON.stringify({
            content,
            type,
        }));
    }

    public sendMessage(content: string) {
        this.send(content, 'message');
    }

    public async close() {
        return new Promise((resolve) => {
            if (!this.webSocket) {
                resolve(true);
            } else {
                clearInterval(this.ping);
                this.webSocket.addEventListener('close', () => resolve(true));
            }
        });
    }

    public fetchMessages(offset: number = 0) {
        this.send(`${offset}`, 'get old');
    }
}

const messengerController = new MessengerController();

export default messengerController;
