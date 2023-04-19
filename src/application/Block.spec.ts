import { expect } from 'chai';
import * as Handlebars from 'handlebars';
import Block from './Block';

describe('Block', () => {
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

    it('Check lifecycle hooks', () => {
        expect(componentWasCreated).to.eq(true);
        testComponent.dispatchComponentDidMount();
        expect(componentWasMounted).to.eq(true);
        expect(componentWasRendered).to.eq(true);
    });

    it('Get TestComponent props', () => {
        expect(testComponent._props.someProp).to.eq('Test value');
        expect(testComponent._props.id).to.eq(123);
    });

    it('Set new props', () => {
        testComponent.setProps({
            id: 456,
            someProp: 'Another value',
        });
        expect(testComponent._props.someProp).to.eq('Another value');
        expect(testComponent._props.id).to.eq(456);
    });

    it('Check CDM event was triggered', () => {
        expect(componentWasUpdated).to.eq(true);
    });
});
