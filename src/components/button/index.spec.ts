import { spy } from 'sinon';
import { expect } from 'chai';
import Button from './index';

describe('Button', () => {
    const watcher = spy();

    it('Should render', () => {
        new Button({    // eslint-disable-line
            buttonLabel: 'Label',
        });
    });

    it('Click should triggered once', () => {
        const button = new Button({
            buttonLabel: 'Label',
            events: {
                click: watcher,
            },
        });

        const el = button.getContent() as HTMLButtonElement;
        el.click();
        expect(watcher.calledOnce).to.be.eq(true);
    });
});
