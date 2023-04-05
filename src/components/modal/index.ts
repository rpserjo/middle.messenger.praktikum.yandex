import template from './modal.hbs';
import './modal.css';
import Block from '../../application/Block';

interface ModalProps {
    modalChildren?: Block[],
}

class Modal extends Block<ModalProps>{
    constructor(props: ModalProps = {}) {
        super(props);
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
}

export default Modal;
