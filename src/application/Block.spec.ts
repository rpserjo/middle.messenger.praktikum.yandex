import { expect } from 'chai';
import * as Handlebars from 'handlebars';
import Block from './Block';

describe('Block class', () => {
    let componentWasCreated: boolean = false;
    let componentWasMounted: boolean = false;
    let componentWasRendered: boolean = false;
    let componentWasUpdated: boolean = false;

    interface TestBlockProps {
        id: number,
        someProp: string
    }

    class TestComponent extends Block<TestBlockProps> {
        constructor(props: TestBlockProps) {
            super(props);
        }

        created() {
            componentWasCreated = true;
        }

        mounted() {
            componentWasMounted = true;
        }

        get _props() {
            return this.props;
        }

        updated() {
            componentWasUpdated = true;
        }

        render() {
            componentWasRendered = true;
            return this.compile(Handlebars.compile('<div></div>'), this.props);
        }
    }

    const testComponent = new TestComponent({
        id: 123,
        someProp: 'Test value',
    });

    it('Lifecycle hooks should be emitted', () => {
        expect(componentWasCreated).to.eq(true);
        testComponent.dispatchComponentDidMount();
        expect(componentWasMounted).to.eq(true);
        expect(componentWasRendered).to.eq(true);
    });

    it('Component props should be set', () => {
        expect(testComponent._props.someProp).to.eq('Test value');
        expect(testComponent._props.id).to.eq(123);
    });

    it('New component props should be set', () => {
        testComponent.setProps({
            id: 456,
            someProp: 'Another value',
        });
        expect(testComponent._props.someProp).to.eq('Another value');
        expect(testComponent._props.id).to.eq(456);
    });

    it('ComponentDidUpdate-event should be emitted', () => {
        expect(componentWasUpdated).to.eq(true);
    });
});
