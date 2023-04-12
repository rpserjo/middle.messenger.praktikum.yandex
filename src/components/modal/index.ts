import template from './modal.hbs';
import './modal.css';
import Block from '../../application/Block';
import Link from '../link';

interface ModalProps {
    modalLabel?: string,
    modalClass?: string,
    modalChildren?: Block[],
}

class Modal extends Block<ModalProps> {
    constructor(props: ModalProps) {
        super(props);
    }

    created() {
        const hideButton = new Link({
            label: 'Hide',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    this.hide();
                },
            },
        });

        this.children = {
            ...this.children,
            hideButton,
        };
        this.props.events = {
            click: (e: Event) => {
                if(e.target && !e.target.closest('.modal__container')){
                    this.hide();
                }
            }
        }
    }

    mounted() {
        this.hide();
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Modal;
