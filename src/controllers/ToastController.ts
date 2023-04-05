import store from '../application/Store';

class ToastController{
    public setInfo(message: string): void{
        store.set('toast', {
            displayToast: true,
            toastMode: 'info',
            toastMessage: message
        });
    }

    public setWarning(message: string): void{
        store.set('toast', {
            displayToast: true,
            toastMode: 'warning',
            toastMessage: message
        });
    }

    public setDanger(message: string): void{
        store.set('toast', {
            displayToast: true,
            toastMode: 'danger',
            toastMessage: message
        });
    }
}

const toastController = new ToastController();

export default toastController;
