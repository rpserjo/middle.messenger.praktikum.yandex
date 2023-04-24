import { expect } from 'chai';
import Input from './index';

describe('Input component', () => {
    it('should render', () => {
        const input = new Input({
            type: 'text',
            name: 'myInput',
            value: 'initial value',
        });
        input.value = 'test';
    });

    it('should get value', () => {
        const value = 'some value';
        const input = new Input({
            value,
        });
        expect(input.value).to.eq(value);
    });

    it('should set new value', () => {
        const oldValue = 'some value';
        const newValue = 'some new value';
        const input = new Input({
            value: oldValue,
        });
        input.value = newValue;
        expect(input.value).to.eq(newValue);
    });

    it('should toggle error message', () => {
        const input = new Input({
            value: 'test',
        });
        const errorMessage = 'Error';
        input.toggleError(errorMessage);
        expect(input.getElement!.querySelector('.error-message')!.textContent).to.eq(errorMessage);
    });
});
