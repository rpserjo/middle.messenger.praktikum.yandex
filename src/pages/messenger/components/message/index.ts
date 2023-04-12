import template from './message.hbs';

import Block from '../../../../application/Block';
import store from '../../../../application/Store';

interface MessageProps {
    message: IMessage
}

class Message extends Block<IMessage>{
    
    private userId;
    
    constructor(props: IMessage){
        super(props, 'Message');
    }
    
    created(){
        this.userId = store.getState().user.id;
        
        this.props.messageSender = this.getSenderName();
        this.props.messageContent = this.getMessageContent();
        this.props.messageTime = this.getMessageTime();
        console.log('EL MESSAGE', this.props);
        
    }
    
    private getSenderName() {
        if(this.props.user_id === this.userId) return;
        const user = store.getState().currentChat.chatUsers.find(user => user.id === this.props.user_id);
        console.log('MESSAGE USER', user);
        if(user.display_name) return user.display_name;
        return `${user.first_name} ${user.second_name}`;
    }
    
    private getMessageContent() {
        return this.props.content;
    }
    
    private getMessageTime() {
        //return this.props.time;
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const date = new Date(this.props.time);
        const now = new Date();
        const _i = date.getMinutes();
        const _h = date.getHours();
        const i = (_i < 10) ? `0${_i}` : _i;
        const h = (_h < 10) ? `0${_h}` : _h;
        const d = date.getDate();
        const m = date.getMonth();
        const diff = now.getDate() - d;
        
        let time = `${d} ${months[m]}, `;
        
        if(diff === 1) time = 'yeasterday, '
        
        if(diff === 0) time = '';
        
        time = `${time}${h}:${i}`;
        
        return time;
    }
    
    render() {
        return this.compile(template, this.props)
    }
}

export default Message;
