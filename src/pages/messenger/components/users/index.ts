import template from './users.hbs';
import './users.css';
import Block from '../../../../application/Block';
import chatsController from '../../../../controllers/ChatsController';
import User from '../user';
import store from '../../../../application/Store';

interface UsersListProps {
    currentChatId: number,
    usersList: IUser[] | never[],
}

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps) {
        super(props, 'Users list');
    }

    render() {
        return this.compile(template, this.props);
    }
}

class AddUsersList extends UsersList {
    updated() {
        this.children.users = (this.props.usersList || []).map((user: IUser) => {
            return new User({
                profileName: (user.display_name) ? user.display_name : `${user.first_name} ${user.second_name}`,
                login: user.login,
                avatar: user.avatar,
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        await chatsController.addUsers({ users: [user.id], chatId: this.props.currentChatId as number });
                    },
                },
            });
        });
    }
}

class DeleteUsersList extends UsersList {
    created() {
        this.propsToChildren();
    }

    propsToChildren() {
        this.children.users = (this.props.usersList || []).map((user: IUser) => {
            return new User({
                profileName: (user.display_name) ? user.display_name : `${user.first_name} ${user.second_name}`,
                login: user.login,
                avatar: user.avatar,
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        if (user.id !== store.getState().user.id) {
                            await chatsController.deleteUsers({ users: [user.id], chatId: this.props.currentChatId as number });
                        }
                    },
                },
            });
        });
    }

    updated() {
        this.propsToChildren();
    }
}

export { AddUsersList, DeleteUsersList };
