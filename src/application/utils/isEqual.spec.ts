import { assert } from 'chai';
import isEqual from './isEqual';

describe('isEqual test', () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } };
    const obj2 = { a: 1, b: 2, c: { d: 3 } };
    const obj3 = { e: 4, f: 5, g: { h: 6 } };
    it('result should be true', () => {
        assert.isTrue(isEqual(obj1, obj2), 'result is false');
    });
    it('result should be false', () => {
        assert.isFalse(isEqual(obj1, obj3), 'result is true');
    });
});
