import template from './chat-element.hbs';
import './chat-element.css';
import Block from '../../../../application/Block';
import cutString from '../../../../application/utils/cutString';
import store from '../../../../application/Store';

class ChatListElement extends Block{
    constructor(props: TProps){
        super(props);
    }

    created() {
        if(this.props.id === store.getState().currentChat){
            console.log(this.props.id)
        }
        const chatLastMessage = (this.props.last_message) ? cutString(this.props.last_message, 15) : 'No messages...';
        const chatNewMessages = (this.props.unread_count) ? (this.props.unread_count) : '';
        this.setProps({chatLastMessage, chatNewMessages});
        this.props.events = {
            click: () => {
                document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
                this.getElement.classList.add('active')
            }
        }
    }

    render(){
        return this.compile(template, this.props);
    }
}

export default ChatListElement;
