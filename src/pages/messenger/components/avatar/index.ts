import template from './avatar.hbs';
import './avatar.css';
import Block from '../../../../application/Block';

interface AvatarProps {
    profileName: string,
    avatarSrc: string
}

class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super(props, 'Avatar');
    }

    render() {
        return this.compile(template, this.props);
    }

    updated() {
        console.log('avatar updated')
    }
}

export default Avatar;
