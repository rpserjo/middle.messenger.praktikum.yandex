import template from './avatar-uploader.hbs';
import './avatar-uploader.css';
import Block from '../../../../../../application/Block';
import { State, withStore } from '../../../../../../application/Store';
import API from '../../../../../../api/Api';

interface AvatarUploaderProps {
    currentAvatar: string
}

class AvatarUploaderBlock extends Block<AvatarUploaderProps> {
    constructor(props: AvatarUploaderProps) {
        super(props, 'Avatar Uploader');
    }

    created() {

    }

    render() {
        return this.compile(template, this.props);
    }
}

const AvatarUploader = withStore(AvatarUploaderBlock, (state: State) => {
    return {
        currentAvatar: `${API.RESOURCES}${state.user?.avatar}`,
    };
});

export default AvatarUploader;
