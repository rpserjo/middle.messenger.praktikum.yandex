import template from './user.hbs';
import './user.css';
import Block from '../../../../application/Block';
import Avatar from '../avatar';
import API from '../../../../api/Api';
import CONFIG from '../../../../application/config';

interface UserProps {
    profileName: string,
    login: string,
    avatar: string | null,
    events?: Record<string, Function>
}

class User extends Block<UserProps> {
    constructor(props: UserProps) {
        super(props, 'User');
    }

    created() {
        const userAvatar = new Avatar({
            avatarSrc: (this.props.avatar) ? `${API.RESOURCES}${this.props.avatar}` : CONFIG.USER_AVATAR,
            profileName: this.props.profileName,
        });

        this.children = { userAvatar };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default User;
