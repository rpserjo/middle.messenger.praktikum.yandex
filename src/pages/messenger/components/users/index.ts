import template from './users.hbs';
import Block from '../../../../application/Block';
import Link from '../../../../components/link';
import chatsController from '../../../../controllers/ChatsController';
import store from '../../../../application/Store';
import { User } from '../../../../api/AuthApi';

interface UsersListProps {
    currentChatId: number,
    usersList: IUser[],
}

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps = {}) {
        props.usersList = (props.usersList) ? props.usersList : [];
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

class AddUsersList extends UsersList {
    updated() {
        this.children.users = (this.props.usersList || []).map((user: IUser) => {
            return new Link({
                label: `${user.first_name} ${user.second_name} / @${user.login}`,
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
    async updated(oldProps:TProps, newProps: TProps) {
        /*if (newProps.currentChatId !== oldProps.currentChatId) {
            await chatsController.getUsers({ id: this.props.currentChatId as number });
        }*/

        /*if (newProps.usersList !== oldProps.usersList) {
            console.log('New userslist');
            this.children.users = (this.props.usersList || []).map((user: IUser) => {
                return new Link({
                    label: `${user.first_name} ${user.second_name} / @${user.login}`,
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
        }*/
        console.log('DELETE USERS')
        this.children.users = (store.getState().currentChat.chatUsers || []).map((user: IUser) => {
            return new Link({
                label: `${user.first_name} ${user.second_name} / @${user.login}`,
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
}

export { AddUsersList, DeleteUsersList };
