declare interface IMessagesList {
    messages: IMessage[]
}

declare interface IMessage {
    id: number,
    chat_id: number,
    time: string,
    type: string,
    user_id: number,
    content: string,
    file?: any
    
}
