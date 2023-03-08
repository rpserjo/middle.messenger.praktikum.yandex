import template from './avatar-uploader.hbs';
import './avatar-uploader.css';
import icon from '../../../../../../components/icon';

const avatarUploader = (params = {}) => {
    const uploadIcon = icon({icon: 'upload'});
    return template({...params, uploadIcon});
}

export default avatarUploader;