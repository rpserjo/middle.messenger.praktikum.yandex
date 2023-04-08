import EventBus from './EventBus';
import set from './utils/set';
import Block from './Block';
import {ToastProps} from '../components/toast';
import {User} from '../api/AuthApi';

export enum StoreEvents {
    UPDATED = 'store:updated',
}

export interface State extends Record<string, any> {
    isLoading: boolean,
    toast: ToastProps,
    user: User | null
}

class Store extends EventBus {
    private state: State = {
        isLoading: false,
        toast: {
            displayToast: false,
            toastMode: null,
            toastMessage: null
        },
        user: null
    };

    public getState(): Indexed{
        return this.state;
    }

    public set(path: string, value: unknown): void {
        set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.UPDATED);
    };


}
const store = new Store();
export default store;

export function withStore<SP extends Partial<any>>(Component: typeof Block<SP>, mapStateToProps: (state: any) => SP){
    return class extends Component {
        constructor(props: any) {
            super({...props, ...mapStateToProps(store.getState())});
            store.on(StoreEvents.UPDATED, () => {
                this.setProps({...mapStateToProps(store.getState())})
            });
        }
    }
}
