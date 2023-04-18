import cutString from './cutString';
import {assert} from 'chai';

describe('cutString test', () => {
    it('should cut string correctly', () => {
        assert.equal(cutString('My test string', 10), 'My test...');
    });
});
