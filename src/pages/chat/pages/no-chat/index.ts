import template from './no-chat.hbs';
import './no-chat.css';
import Block from '../../../../application/Block';
import Icon from '../../../../components/icon';

class NoChat extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', props, 'NoChat');
    }

    created() {
        const newChatIcon = new Icon({ icon: 'newChat' });
        this.children = {
            newChatIcon,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default NoChat;
