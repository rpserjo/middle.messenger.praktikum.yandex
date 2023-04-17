import template from './media-preview.hbs';
import './media-preview.css';
import Block from '../../../../application/Block';
import store, { State, withStore } from '../../../../application/Store';
import Media from '../media';

interface MediaPreviewProps {
    files: File[]
}
class MediaPreviewBlock extends Block<MediaPreviewProps> {
    constructor(props: MediaPreviewProps) {
        super(props);
    }

    updated() {
        console.log(this.props);
        this.children.previews = this.props.files.map((file: File) => {
            return new Media({
                url: URL.createObjectURL(file),
                fromPreview: true,
                events: {
                    click: () => {
                        const files = store.getState().filesToSend;
                        let newFiles: File[] | unknown = Array.from(files).filter((_file: File) => _file.name !== file.name);
                        newFiles = (Array.isArray(newFiles) && newFiles.length > 0) ? newFiles : null;
                        store.set('filesToSend', newFiles);
                    },
                },
            });
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

const MediaPreview = withStore(MediaPreviewBlock, (state: State) => {
    if (state.filesToSend === null) {
        return {
            files: [],
        };
    }
    return {
        files: [...state.filesToSend],
    };
});

export default MediaPreview;
