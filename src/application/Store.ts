import EventBus from './EventBus';
import set from './utils/set';
import Block from './Block';
import { ToastProps } from '../components/toast';
import isEqual from './utils/isEqual';

export enum StoreEvents {
    UPDATED = 'store:updated',
}

export interface State extends Record<string, unknown> {
    isLoading: boolean,
    toast: ToastProps,
    user: IUser | null,
    chatsList: IChatElement[],
    currentChat: {
        id: number | null,
        title: string | null,
        avatar: string | null,
        chatUsers: IUser[],
        messages: any[],
        offsetLoaded: number,
        canLoadMore: boolean,
        scroll: boolean
    },
    filesToSend: File[] | null
}

class Store extends EventBus {
    private state: State = {
        isLoading: false,
        toast: {
            displayToast: false,
            toastMode: null,
            toastMessage: null,
        },
        user: null,
        chatsList: [],
        currentChat: {
            id: null,
            title: null,
            avatar: null,
            chatUsers: [],
            messages: [],
            offsetLoaded: 0,
            canLoadMore: false,
            scroll: false,
        },
        filesToSend: null,
    };

    public getState(): Indexed {
        return this.state;
    }

    public set(path: string, value: unknown): void {
        set(this.state, path, value);
        this.emit(StoreEvents.UPDATED);
    }
}
const store = new Store();

export default store;

export function withStore<SP extends Partial<any>>(Component: typeof Block<SP>, mapStateToProps: (state: any) => SP) {
    return class extends Component {
        constructor(props: any) {
            let state = mapStateToProps(store.getState());
            super({ ...props, ...mapStateToProps(store.getState()) });
            store.on(StoreEvents.UPDATED, () => {
                const newState = mapStateToProps(store.getState());
                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                }
                state = newState;
            });
        }
    };
}
