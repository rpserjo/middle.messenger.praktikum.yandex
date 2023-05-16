import { assert } from 'chai';
import cloneDeep from './cloneDeep';

describe('cloneDeep() test', () => {
    const obj = { a: 1, b: 2, c: { d: 3 } };
    const arr = [1, 2, 3];

    it('Objects should not be equal', () => {
        assert.notEqual(obj, cloneDeep(obj), 'Objects are equal');
    });

    it('Arrays should not be equal', () => {
        assert.notEqual(arr, cloneDeep(arr), 'Arrays are equal');
    });
});
