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


/*export function withStore(Component: typeof Block, mapStateToProps: (state: any) => any){
    return class extends Component {
        constructor(props: any) {
            super({...props, ...mapStateToProps(store.getState())});
            store.on(StoreEvents.UPDATED, () => {
                this.setProps({...mapStateToProps(store.getState())})
            });
        }
    }
}*/

export function withStore<SP extends Partial<any>>(Component: typeof Block<SP>, mapStateToProps: (state: any) => SP){
    return class extends Component {
        constructor(props: any = {}) {
            super({...props, ...mapStateToProps(store.getState())});
            store.on(StoreEvents.UPDATED, () => {
                this.setProps({...mapStateToProps(store.getState())})
            });
        }
    }
}

export function withStore1<SP extends Partial<any>>(mapStateToProps: (state: any) => SP) {
    return function wrap<P>(Component: typeof Block<SP & P>) {
        return class WithStore extends Component {

            constructor(props: Omit<P, keyof SP>) {
                let previousState = { ...mapStateToProps(store.getState()) };

                super({ ...(props as P), ...previousState });

                store.on(StoreEvents.UPDATED, () => {
                    const stateProps = mapStateToProps(store.getState());

                    previousState = { ...stateProps };

                    this.setProps({ ...previousState });
                });

            }

        };

    };
}
