import template from './toast.hbs';
import './toast.css';
import Block from '../../application/Block';
import store, { State, withStore } from '../../application/Store';

export interface ToastProps {
    displayToast: boolean,
    toastMode: null | 'info' | 'warning' | 'danger',
    toastMessage: null | string
}

class ToastBlock extends Block<ToastProps> {
    private timer: number;

    constructor(props: ToastProps) {
        super(props, 'Toast');
    }

    mounted() {
        this.hide();
    }

    updated(oldProps, newProps) {
        if (this.props.displayToast === true) {
            this.show();
            setTimeout(() => { this.getElement.style.transform = 'translateY(-100px)'; }, 0);
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.slideOut();
            }, 5000);
        }
    }

    slideOut() {
        this.getElement.style.transform = 'translateY(0px)';
        setTimeout(() => {
            store.set('toast', {
                displayToast: false,
                toastMode: null,
                toastMessage: null,
            });
            this.hide();
        }, 500);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const Toast = withStore(ToastBlock, (state: State) => {
    return {...state.toast};
});
