import template from './message.hbs';
import './message.css';
import Block from '../../../../application/Block';
import store from '../../../../application/Store';
import dateFormatter from '../../../../application/utils/dateFormatter';

interface MessageProps extends IMessage {
    messageType?: 'outgoing' | 'incoming',
    messageSender?: string,
    messageContent?: string,
    messageTime?: string
}

class Message extends Block<MessageProps> {
    private userId: number;

    constructor(props: MessageProps) {
        super(props, 'Message');
    }

    created() {
        this.userId = store.getState().user.id;
        this.setProps({
            messageType: (this.userId === this.props.user_id) ? 'outgoing' : 'incoming',
            messageSender: this.getSenderName(),
            messageContent: this.getMessageContent(),
            messageTime: dateFormatter(this.props.time, false),
        });
    }

    private getSenderName() {
        if (this.props.user_id === this.userId) {
            return '';
        }
        const user = store.getState().currentChat.chatUsers.find((user: IUser) => user.id === this.props.user_id);
        if (user.display_name) {
            return user.display_name;
        }
        return `${user.first_name} ${user.second_name}`;
    }

    private getMessageContent() {
        return this.props.content;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Message;
