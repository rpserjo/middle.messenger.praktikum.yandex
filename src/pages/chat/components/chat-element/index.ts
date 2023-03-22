import template from './chat-element.hbs';
import './chat-element.css';
import Avatar from '../avatar';
import Block from '../../../../utils/Block';

interface ChatElementProps {
    id: number | string,
    chatUserAvatar: Avatar,
    chatUserName: string,
    chatNewMessages?: string,
    chatLastMessage: string,
    chatLastMessageTime: string
}

class ChatElement extends Block {
    constructor(props: ChatElementProps = {}) {
        super('div', props, 'ChatElement');
    }

    mounted() {
        const element = this.element.querySelector('.chat-element');
        if (element) {
            element.addEventListener('click', (e) => {
                const els = document.querySelectorAll('.chat-element__element.current');
                for (let i = 0; i < els.length; i + 1) {
                    els[i].classList.toggle('.current', false);
                }
                e.target.classList.toggle('.current', true);
            });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatElement;
