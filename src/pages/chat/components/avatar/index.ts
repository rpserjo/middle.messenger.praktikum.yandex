import template from './avatar.hbs';
import './avatar.css';
import Block from '../../../../utils/Block';

interface AvatarProps {
    profileName: string,
    avatarSrc: string
}

class Avatar extends Block {
    constructor(props: AvatarProps = {}) {
        super('div', props, 'Avatar');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Avatar;
