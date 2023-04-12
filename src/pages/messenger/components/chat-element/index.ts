import template from './chat-element.hbs';
import './chat-element.css';
import Block from '../../../../application/Block';
import cutString from '../../../../application/utils/cutString';
import store from '../../../../application/Store';

interface ChatListElementProps {
    currentChatId: number | null,
    chatElement: IChatElement,
    events?: () => void
}

class ChatListElement extends Block<ChatListElementProps> {
    constructor(props: ChatListElementProps) {
        super(props);
    }

    created() {
        const chatLastMessage = this.lastMessage(this.props.chatElement.last_message)// ? cutString(this.props.chatElement.last_message.content, 15) : 'No messages...';
        const chatNewMessages = (this.props.chatElement.unread_count) ? (this.props.chatElement.unread_count) : '';
        const chatLastMessageTime = (this.props.chatElement.last_message) ? this.props.chatElement.last_message.time : '';
        this.setProps({ chatLastMessage, chatNewMessages, chatLastMessageTime });
    }
    
    private lastMessage(lastMessage: Nullable<ILastMessage>): string{
        if(!lastMessage){
            return '<i>No messages yet</i>';
        }
        
        return (lastMessage.user.login === store.getState().user.login) ? `<b>You:</b> ${cutString(lastMessage.content, 15)}` : cutString(lastMessage.content, 15);
        
        //return cutString(lastMessage.content, 15);
    }

    render() {
        return this.compile(template, this.props);
    }
    
    updated(){
        if(this.props.chatElement.id === this.props.currentChatId){
            setTimeout(() => this.getElement?.classList.add('active'), 0);
        }
    }
}

export default ChatListElement;
