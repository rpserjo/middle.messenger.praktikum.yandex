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

    public async connect(options: SocketOptions): Promise<void> {
        if (this.webSocket !== null) {
            console.log('WS exists');
            await this.close();
        } else {
            console.log('WS is null');
        }

        this.userId = options.userId;
        this.chatId = options.chatId;
        this.token = options.token;

        this.webSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);

        this.webSocket.addEventListener('open', () => {
            console.log('WS connected');
            this.fetchMessages();
        });

        this.webSocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            const { messages } = store.getState().currentChat;
            if (Array.isArray(data)) {
                const offset = store.getState().currentChat.offsetLoaded;
                store.set('currentChat.scroll', offset === 0);
                store.set('currentChat.messages', [...messages, ...data]);
                store.set('currentChat.canLoadMore', (data.length === 20));
                store.set('currentChat.offsetLoaded', offset + 20);
            } else if (data.type === 'message') {
                store.set('currentChat.scroll', true);
                store.set('currentChat.messages', [
                    data,
                    ...messages,
                ]);
            }
        });

        this.webSocket.addEventListener('close', (event: CloseEvent) => {
            if (event.wasClean) {
                console.log(`WS #${this.chatId} connection was closed clean`);
            } else {
                console.log(`WS #${this.chatId} network error`);
            }
            console.log(`WS #${this.chatId} | Code: ${event.code} | Reason: ${event.reason}`);
        });

        this.ping = setInterval(() => {
            this.webSocket?.send(JSON.stringify({
                type: 'ping',
            }));
        }, 10000);
    }

    public send(content: string, type: string = 'message'): void {
        this.webSocket?.send(JSON.stringify({
            content,
            type,
        }));
    }

    public sendMessage(content: string): void {
        this.send(content, 'message');
    }

    public async close(): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.webSocket) {
                resolve(true);
            } else {
                clearInterval(this.ping);
                this.webSocket.addEventListener('close', () => {
                    console.log('WS reconnect');
                    resolve(true);
                });
                this.webSocket.close();
            }
        });
    }

    public fetchMessages(offset: number = 0): void {
        this.send(`${offset}`, 'get old');
    }

    public fetchMoreMessages(): void {
        const { canLoadMore } = store.getState().currentChat;
        const offset = store.getState().currentChat.offsetLoaded;

        if (canLoadMore) {
            this.fetchMessages(offset);
        }
    }
}

const messengerController = new MessengerController();

export default messengerController;
