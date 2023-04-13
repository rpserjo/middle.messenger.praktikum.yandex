import template from './users.hbs';
import Block from '../../../../application/Block';
import Link from '../../../../components/link';
import chatsController from '../../../../controllers/ChatsController';
import store from '../../../../application/Store';

interface UsersListProps {
    currentChatId: number,
    usersList: IUser[] | never[],
}

class UsersList extends Block<UsersListProps> {
    constructor(props: UsersListProps) {
        // props.usersList = (props.usersList) ? props.usersList : [];
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
    // async updated(oldProps:TProps, newProps: TProps) {
    async updated() {
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
    }
}

export { AddUsersList, DeleteUsersList };
