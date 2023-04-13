import template from './users.hbs';
import './users.css';
import Block from '../../../../application/Block';
import chatsController from '../../../../controllers/ChatsController';
import User from '../user';

interface UsersListProps {
    currentChatId: number,
    usersList: IUser[] | never[],
}

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

class AddUsersList extends UsersList {
    updated() {
        this.children.users = (this.props.usersList || []).map((user: IUser) => {
            /* return new Link({
                label: `${user.first_name} ${user.second_name} / @${user.login}`,
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        await chatsController.addUsers({ users: [user.id], chatId: this.props.currentChatId as number });
                    },
                },
            }); */
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
    // async updated(oldProps:TProps, newProps: TProps) {
    async updated() {
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

export { AddUsersList, DeleteUsersList };
