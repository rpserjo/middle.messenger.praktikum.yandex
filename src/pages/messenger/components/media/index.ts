import Block from '../../../../application/Block';
import template from './media.hbs';
import './media.css';

interface MediaProps {
    url: string,
    fromPreview: boolean,
    events?: Record<string, Function>
}
class Media extends Block<MediaProps> {
    constructor(props: MediaProps) {
        super(props);
    }

    created() {

    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Media;
