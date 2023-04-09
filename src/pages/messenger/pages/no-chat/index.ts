import template from './no-chat.hbs';
import './no-chat.css';
import Block from '../../../../application/Block';
import Icon from '../../../../components/icon';
import Modal from '../../../../components/modal';
import Input from '../../../../components/input';
import Button from '../../../../components/button';
import {validateForm} from '../../../../application/utils/validate';
import chatsApi from '../../../../api/ChatsApi';
import chatsController from '../../../../controllers/ChatsController';

class NoChat extends Block {
    constructor(props: TProps) {
        super(props, 'NoChat');
    }

    created() {
        const submitHandler = async(e: Event, input: Input) => {
            e.preventDefault();
            const formData = validateForm([input]);
            if(formData){
                const result = await chatsController.createChat(formData);
                if(result){
                    input.value = '';
                    newChatModal.hide();
                }
            }
        }

        const newChatInput = new Input({
            label: 'Chat title',
            placeholder: 'Chat title',
            name: 'title',
            id: 'title',
            validation: {
                required: true,
            }
        });

        const newChatSubmit = new Button({
            buttonLabel: 'Create',
            events: {
                click: (e: Event) => submitHandler(e, newChatInput)
            }
        })
        const newChatModal = new Modal({
            modalLabel: 'Create new chat',
            modalChildren: [newChatInput, newChatSubmit]
        });

        const newChatIcon = new Icon({
            icon: 'newChat',
            events: {
                click: () => newChatModal.show(true)
            }
        });
        this.children = {
            newChatIcon,
            newChatModal
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default NoChat;
