declare interface IUser {
    id: number,
    first_name: string
    second_name: string,
    display_name?: string,
    login: string,
    email: string,
    phone: string,
    avatar: string | null
}

declare interface ISignInData {
    login: string,
    password: string
}

declare interface ISignUpData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

declare interface IUploadAvatarData {
    avatar: File
}

declare interface IUpdateProfileData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

declare interface IChangePasswordData {
    oldPassword: string,
    newPassword: string
}

declare interface ISearchUserData {
    login: string
}
