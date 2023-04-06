import template from './messenger.hbs';
import './messenger.css';
import Block from '../../application/Block';
import Input from '../../components/input';
import Icon from '../../components/icon';
import {CBlock} from '../../application/Route';
import store, {State, withStore} from '../../application/Store';

interface MessengerProps {
    first_name: string,
    second_name: string,
    chats: any[],
}

class MessengerBlock extends Block<MessengerProps> {
    constructor(props: MessengerProps = {first_name: store.getState().user.first_name}) {
        console.log(props)
        super(props, 'Chat');
    }

    created() {
        const searchInput = new Input({
            id: 'search',
            name: 'search',
            placeholder: 'Search',
        });

        const profileIcon = new Icon({
            icon: 'profile2',
        });




        this.children = {
            searchInput,
            profileIcon,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

const Messenger = withStore(MessengerBlock, (state: State) => {
    console.log(state.user)
    return state.user
});

export default Messenger;
