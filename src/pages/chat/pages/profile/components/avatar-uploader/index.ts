import template from './avatar-uploader.hbs';
import './avatar-uploader.css';
import Block from '../../../../../../utils/Block';

class AvatarUploader extends Block {
    constructor(props = {}) {
        super('div', props, 'AvatarUploader');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default AvatarUploader;
