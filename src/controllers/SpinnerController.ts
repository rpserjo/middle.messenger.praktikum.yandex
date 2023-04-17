import store from '../application/Store';

class SpinnerController {
    public toggle(status?: boolean | undefined): void {
        if (typeof status === 'boolean') {
            store.set('isLoading', !store.getState().isLoading);
        } else {
            store.set('isLoading', status);
        }
    }
}

const spinnerController = new SpinnerController();

export default spinnerController;
