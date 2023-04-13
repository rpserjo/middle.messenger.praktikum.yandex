declare interface IChatElement {
    avatar: string | null,
    created_by: number,
    id: number,
    last_message: Nullable<ILastMessage>,
    title: string,
    unread_count: number
}

declare interface ILastMessage {
    content: string,
    id: number,
    time: string,
    user: IUser
}

declare interface ICreateChatData {
    title: string
}

declare interface IGetChatsData{
    offset?: number,
    limit?: number,
    filter?: string
}

declare interface IDeleteChatData{
    chatId: number,
}

declare interface IAddDeleteUsersData{
    users: number[],
    chatId: number
}

declare interface IGetUsersData {
    id: number,
    offset?: number,
    limit?: number,
    name?: string,
    email?: string
}

declare interface IUploadChatAvatar {
    chatId: string,
    avatar: File
}
