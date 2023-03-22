import template from './message.hbs';
import './message.css';
import Block from '../../../../../../utils/Block.ts';

interface MessageProps {
    messageType: string,
    messageContent: string,
    messageDatetime: string
}

class Message extends Block {
    constructor(props: MessageProps = {}) {
        super('div', props, 'Message');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Message;
