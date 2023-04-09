import template from './modal.hbs';
import './modal.css';
import Block from '../../application/Block';
import Link from '../link';

interface ModalProps {
    modalLabel?: string,
    modalChildren?: Block[],
}

class Modal extends Block<ModalProps>{
    constructor(props: ModalProps) {
        console.log('PRops', props);
        super(props);
    }

    created() {
        const hideButton = new Link({
            label: 'Hide',
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    this.hide();
                }
            }
        });

        //this.children.modalChildren = this.props.modalChildren;

        this.children = {
            ...this.children,
            hideButton,
            //modalChildren: this.props.modalChildren
        }

        console.log(this);
    }

    mounted(){
        this.hide();
        setTimeout(() => {
            const bg = this.getElement.querySelector('.modal-wrapper');
            console.log(bg)
        }, 1000)

        //?.addEventListener('click', (e: Event) => this.hide())
    }

    render(){
        return this.compile(template, this.props);
    }

    updated(){
        console.log('modal updated');
    }
}

export default Modal;
