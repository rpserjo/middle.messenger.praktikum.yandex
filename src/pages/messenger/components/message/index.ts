import template from './message.hbs';
import './message.css';
import Block from '../../../../application/Block';
import store from '../../../../application/Store';
import dateFormatter from '../../../../application/utils/dateFormatter';
import API from '../../../../api/Api';
import resourceApi from '../../../../api/ResourceApi';

interface MessageProps extends IMessage {
    messageType?: 'outgoing' | 'incoming',
    messageSender?: string,
    messageContent?: string,
    isFile?: boolean,
    messageTime?: string,
    events?: Record<string, Function>
}

class Message extends Block<MessageProps> {
    private userId: number;

    constructor(props: MessageProps) {
        super(props, 'Message');
    }

    created() {
        this.userId = store.getState().user.id;
        const { messageContent, isFile } = this.getMessageContent();
        if (isFile) {
            this.props.events = {
                click: async (e: Event) => {
                    e.stopPropagation();
                    const tag = (e.target as HTMLElement).tagName;
                    if (tag === 'SPAN') {
                        const image = await resourceApi.getResource(this.props.file?.path || '');
                        const imageURL = URL.createObjectURL(image);
                        const anchor = document.createElement('a');
                        anchor.href = imageURL;
                        anchor.download = this.props.file?.filename || '';
                        anchor.click();
                    } else {
                        this.getElement.querySelector('.image-preview')?.classList.toggle('full');
                    }
                },
            };
        }
        this.setProps({
            messageType: (this.userId === this.props.user_id) ? 'outgoing' : 'incoming',
            messageSender: this.getSenderName(),
            messageContent,
            isFile,
            messageTime: dateFormatter(this.props.time, false),
        });
    }

    private getSenderName() {
        if (this.props.user_id === this.userId) {
            return '';
        }
        const user = store.getState().currentChat.chatUsers.find((user: IUser) => user.id === this.props.user_id);
        if (user) {
            if (user?.display_name) {
                return user.display_name;
            }
            return `${user.first_name} ${user.second_name}`;
        }
        return `Deleted user [${this.props.user_id}]`;
    }

    private getMessageContent() {
        if (this.props.type === 'message') {
            return { messageContent: this.props.content, isFile: false };
        }
        if (this.props.type === 'file' && this.props.file?.content_type.includes('image')) {
            return {
                messageContent: `${API.RESOURCES}${this.props.file?.path || ''}`,
                isFile: true,
            };
        }
        return { messageContent: '<< broken message >>', isFile: false };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Message;
