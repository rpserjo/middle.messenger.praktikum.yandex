import template from './message.hbs';
import './message.css';
import Block from '../../../../../../application/Block';

interface MessageProps {
    messageType: string,
    messageContent: string,
    messageDatetime: string
}

class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super(props, 'Message');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Message;
