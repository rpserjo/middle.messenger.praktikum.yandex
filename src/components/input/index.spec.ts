//import { expect } from 'chai';
import Input from './index';

describe('Input component', () => {
    it('should render', () => {
        new Input({
            type: 'text',
            name: 'myInput',
            value: 'initial value'
        });
    })
});
