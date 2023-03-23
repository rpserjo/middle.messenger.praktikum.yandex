import template from './avatar-uploader.hbs';
import './avatar-uploader.css';
import Block from '../../../../../../utils/Block';
import Button from '../../../../../../components/button';
import Icon from '../../../../../../components/icon';
import Link from '../../../../../../components/link';

interface AvatarUploaderProps {
    currentAvatar?: string,
    uploadIcon?: Icon,
    uploadForm: boolean,
    uploadButton?: Link | Button,
    cancelButton?: Link | Button
}

class AvatarUploader extends Block {
    constructor(props: AvatarUploaderProps) {
        super('div', props, 'AvatarUploader');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default AvatarUploader;
