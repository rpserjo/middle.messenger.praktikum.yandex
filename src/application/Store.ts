import EventBus from './EventBus';
import set from './utils/set';

export enum StoreEvents {
    UPDATED = 'store:updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState(): Indexed{
        return this.state;
    }

    public set(path: string, value: unknown): void {
        set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.UPDATED);
    };
}

export default new Store();
