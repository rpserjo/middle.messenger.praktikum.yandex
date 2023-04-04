import EventBus from './EventBus';
import set from './utils/set';
import Block from './Block';

export enum StoreEvents {
    UPDATED = 'store:updated',
}

class Store extends EventBus {
    private state: Indexed = {
        isLoading: false,
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


export function withStore(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed){
    return class extends Component {
        constructor(props: TProps) {
            super('', {...props, ...mapStateToProps(store.getState())});
            store.on(StoreEvents.UPDATED, () => {
                this.setProps({...mapStateToProps(store.getState())})
            });
        }
    }
}
