import template from './users.hbs';
import Block from '../../../../application/Block';
import Link from '../../../../components/link';
import chatsController from '../../../../controllers/ChatsController';
import store from '../../../../application/Store';
import { User } from '../../../../api/AuthApi';

interface UsersListProps {
    currentChat: number,
    usersList: User[],
}

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps = { currentChat: 0, usersList: [] }) {
        props.usersList = (props.usersList) ? props.usersList : [];
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

class AddUsersList extends UsersList {
    updated() {
        this.children.users = (this.props.usersList || []).map((user: User) => {
            return new Link({
                label: `${user.first_name} ${user.second_name} / @${user.login}`,
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        await chatsController.addUsers({ users: [user.id], chatId: this.props.currentChat as number });
                    },
                },
            });
        });
    }
}

class DeleteUsersList extends UsersList {
    async updated(oldProps:TProps, newProps: TProps) {
        if (newProps.currentChat !== oldProps.currentChat) {
            await chatsController.getUsers({ id: this.props.currentChat as number });
        }

        if (newProps.usersList !== oldProps.usersList) {
            console.log('New userslist');
            this.children.users = (this.props.usersList || []).map((user: User) => {
                return new Link({
                    label: `${user.first_name} ${user.second_name} / @${user.login}`,
                    events: {
                        click: async (e: Event) => {
                            e.preventDefault();
                            if (user.id !== store.getState().user.id) {
                                await chatsController.deleteUsers({ users: [user.id], chatId: this.props.currentChat as number });
                            }
                        },
                    },
                });
            });
        }
    }
}

export { AddUsersList, DeleteUsersList };
