const HOST = 'https://ya-praktikum.tech/api/v2';
const API = {
	HOST: HOST,
	RESOURCES: HOST + '/resources',
	ENDPOINTS: {
		AUTH: {
			ENDPOINT: '/auth',
			SIGNUP: '/signup',
			SIGNIN: '/signin',
			USER: '/user',
			LOGOUT: '/logout'
		},
		USER: {
			ENDPOINT: '/user',
			PROFILE: '/profile',
			AVATAR: '/profile/avatar',
			PASSWORD: '/password',
			SEARCH: '/search'
		}
	}
}

export default API;
