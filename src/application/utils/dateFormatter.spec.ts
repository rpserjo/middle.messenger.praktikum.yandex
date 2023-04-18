import {assert} from 'chai';
import dateFormatter from './dateFormatter';

describe('dateFormatter test', () => {
    it('should format date', () => {
        assert.equal(dateFormatter('2020-01-02T14:22:22.000', false), '02 jan, 14:22');
    });
});
