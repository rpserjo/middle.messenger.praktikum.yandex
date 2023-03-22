import template from './active-chat.hbs';
import './active-chat.css';
import Avatar from '../../components/avatar';
import Block from '../../../../utils/Block';
import Icon from '../../../../components/icon';
import Input from '../../../../components/input';
import { validate, validateForm } from '../../../../utils/validate';
import Message from './components/message';
import DateLine from './components/date-line';
import MenuItem from './components/menu-item';

/*
import icon from '../../../../components/icon';
import input from '../../../../components/input';
import menuItem from './components/menu-item';
import message from './components/message';
import dateLine from './components/date-line';
*/

interface ActiveChatProps {
	chatAvatar: Avatar,
	chatTitle: string,	
}

class ActiveChat extends Block {
	constructor(props: ActiveChatProps = {}){
		super('div', props, 'ActiveChat');	
	}
	
	created() {
		this.setProps({
			chatTitle: 'James Howlett',
		});
		
		const chatAvatar = new Avatar({
			avatarSrc: '/static/avatars/wolverine.png', 
			profileName: 'James Howlett'
		});
		
		const optionsIcon = new Icon({
			icon: 'options'
		});
		
		const attachIcon = new Icon({
			icon: 'attach'
		});
		
		const chatSendMessage = new Input({
			type: 'text', 
			name: 'message', 
			id: 'message',
			value: '', 
			placeholder: 'Message',			
			classList: 'my-10',
         validation: {
         	required: true,
            rule: 'message'
         },
         withoutErrorMessage: true,
         events: {
				focusin: () => this.children.chatSendMessage.toggleError(),
				focusout: () => this.children.chatSendMessage.toggleError(validate(this.children.chatSendMessage).validationError)
         }
		});
		
		const messages = [
    		{
        		type: 'inbox',
		      content: 'received message ',
        		datetime: '13:20',
    		},
    		{
        		type: 'outbox',
        		content: 'sent message ',
        		datetime: '15:20',
    		},
		];
		
		const chatMessagesList = Array.from(Array(50)).map((_, i) => {
        if (i % 8 === 0) {
            return new DateLine({ date: '01/02/03' });
        }
        const key = Math.round(Math.random());
        const sample = messages[key];
        return new Message({
            messageType: sample.type,
            messageContent: sample.content.repeat(Math.ceil(Math.random() * 30)),
            messageDatetime: sample.datetime,
        });
    	});
    	
    	const chatOptions = [
			new MenuItem({
				itemLabel: 'Add user'			
			}),
			new MenuItem({
				itemLabel: 'Remove user'			
			}),
			new MenuItem({
				itemLabel: 'Delete chat'			
			})
    	]
				
		this.children = {
			chatAvatar,
			optionsIcon,
			attachIcon,
			chatSendMessage,
			chatMessagesList,
			chatOptions
		}
		
		const submitHandler = (e: Event, inputs: Input[]) => {
			console.log('submit', inputs)
            const formData = validateForm(inputs);
            console.log(formData)
            if(formData) {
                console.log(formData);
            }
        }
        
		const sendIcon = new Icon({
			icon: 'message',
			events: {
				click: (e) => {
					e.preventDefault();
               const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
               submitHandler(e, inputs)
            }
        }
		});
		
		this.children = {
			...this.children,
			sendIcon
		}
	}
	
	mounted() {
		const list = document.querySelector('#messages-list');
		//list.scrollTop = list.scrollHeight;
		if(list){
			list.scrollTop = list.scrollHeight;		
		}
		console.log(list);	
	}
	
	updated() {
		const list = document.querySelector('#messages-list');
		//list.scrollTop = list.scrollHeight;
		console.log(list)	
	}
	
	render() {
		return this.compile(template, this.props);
	}
}

export default ActiveChat;
/* Sample data */
/*const chatTitle = 'James Howlett';
const chatAvatar = avatar({ avatarSrc: '/static/avatars/wolverine.png', profileName: chatTitle });
const messages = [
    {
        type: 'inbox',
        content: 'received message ',
        datetime: '13:20',
    },
    {
        type: 'outbox',
        content: 'sent message ',
        datetime: '15:20',
    },
];*/
/* Sample data */
/*
const activeChat = (params = {}) => {
    const optionsIcon = icon({ icon: 'options' });
    const attachIcon = icon({ icon: 'attach' });
    const sendIcon = icon({ icon: 'message' });
    const chatMessage = input({
        type: 'text', name: 'message', id: 'message', placeholder: 'Message',
    });
    const optionsOptions = [
        menuItem({ itemIcon: icon({ icon: 'addUser' }), itemLabel: 'Add user' }),
        menuItem({ itemIcon: icon({ icon: 'removeUser' }), itemLabel: 'Remove user' }),
        menuItem({ itemIcon: icon({ icon: 'remove' }), itemLabel: 'Delete chat' }),
    ];
    const attachOptions = [
        menuItem({ itemIcon: icon({ icon: 'media' }), itemLabel: 'Media' }),
        menuItem({ itemIcon: icon({ icon: 'geolocation' }), itemLabel: 'Geolocation' }),
    ];

    const chat = Array.from(Array(50)).map((_, i) => {
        if (i % 8 === 0) {
            return dateLine({ date: '01/02/03' });
        }
        const key = Math.round(Math.random());
        const sample = messages[key];
        return message({
            messageType: sample.type,
            messageContent: sample.content.repeat(Math.ceil(Math.random() * 30)),
            messageDatetime: sample.datetime,
        });
    });
    return template({
        ...params,
        chatAvatar,
        chatTitle,
        optionsIcon,
        attachIcon,
        sendIcon,
        chatMessage,
        optionsOptions,
        attachOptions,
        chat,
    });
};

export default activeChat;*/
