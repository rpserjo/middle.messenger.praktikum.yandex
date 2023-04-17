const HOST = 'https://ya-praktikum.tech/api/v2';
const API = {
    HOST,
    RESOURCES: `${HOST}/resources`,
    ENDPOINTS: {
        AUTH: {
            ENDPOINT: '/auth',
            SIGNUP: '/signup',
            SIGNIN: '/signin',
            USER: '/user',
            LOGOUT: '/logout',
        },
        USER: {
            ENDPOINT: '/user',
            PROFILE: '/profile',
            AVATAR: '/profile/avatar',
            PASSWORD: '/password',
            SEARCH: '/search',
        },
        CHAT: {
            ENDPOINT: '/chats',
            TOKEN: '/token',
            USERS: '/users',
            AVATAR: '/avatar',
        },
    },
};

export default API;
