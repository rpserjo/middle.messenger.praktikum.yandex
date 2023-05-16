import { expect } from 'chai';
import EventBus from './EventBus';

describe('EventBus', () => {
    let testVariable: boolean = false;

    let testVariable2: number = 0;

    const eventBus: EventBus = new EventBus();
    eventBus.on('custom-event', (): void => {
        testVariable = true;
    });

    eventBus.on('custom-event2', (val: number): void => {
        testVariable2 = val;
    });

    it('Check custom event was emitted', () => {
        eventBus.emit('custom-event');
        expect(testVariable).to.eq(true);
    });

    it('Another custom event was emitted', () => {
        const random: number = Math.random();
        eventBus.emit('custom-event2', random);
        expect(testVariable2).to.eq(random);
    });
});
