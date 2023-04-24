import template from './input.hbs';
import './input.css';
import Block from '../../application/Block';

interface InputProps {
    type?: string,
    id?: string,
    name?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    withoutErrorMessage?: boolean,
    validation?: Record<string, any>,
    events?: Record<string, any>
}

class Input extends Block<InputProps> {
    constructor(props: InputProps = { type: 'text', withoutErrorMessage: false }) {
        super(props, 'Input');
    }

    get validation(): Record<string, string | boolean | Input> | undefined {
        return this.props.validation;
    }

    get value(): string {
        return this.element?.querySelector('input')!.value || '';
    }

    set value(value: string) {
        this.element!.querySelector('input')!.value = value;
    }

    get name(): string {
        return this.element?.querySelector('input')?.name || '';
    }

    toggleError(errorMessage: string = ''): void {
        this.errorMessage = errorMessage;
        this.element?./* querySelector('.input-wrapper')?. */classList.toggle('has-error', errorMessage.length > 0);
    }

    set errorMessage(value: string) {
        if (this.element?.querySelector('p.error-message')) {
            this.element!.querySelector('p.error-message')!.textContent = value;
        }
    }

    render() {
        console.log('TPL', template)
        return this.compile(template, this.props);
    }
}
export default Input;
