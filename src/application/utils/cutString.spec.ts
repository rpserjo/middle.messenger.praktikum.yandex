import { assert } from 'chai';
import cutString from './cutString';

describe('cutString test', () => {
    it('should cut string correctly', () => {
        assert.equal(cutString('My test string', 10), 'My test...');
    });
});
