//import { expect } from 'chai';
import Input from './index';

describe('Input component', () => {
    const input = new Input({
        type: 'text',
        name: 'myInput',
        value: 'initial value'
    });
    
    console.log(input);
});
