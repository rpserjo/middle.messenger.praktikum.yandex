import * as Handlebars from 'handlebars';
import { expect } from 'chai';
import Block from './Block';
import Route, { CBlock } from './Route';

describe('Route class', () => {
    interface TestComponentProps {
        id: number,
        value: string
    }

    class TestComponent extends Block<TestComponentProps> {
        constructor(props: TestComponentProps) {
            super(props);
        }

        render() {
            return this.compile(Handlebars.compile('<div>Route, id: {{ id }}, value: {{ value }}</div>'), this.props);
        }
    }

    class TestRoute extends Route {
        constructor(pathname: string, view: CBlock, props: TProps) {
            super(pathname, view, props);
        }

        get _block() {
            return this.block;
        }
    }

    const pathname = '/some_path';
    const route = new TestRoute(pathname, TestComponent, { id: 123, value: 'some value', rootQuery: '#root' });

    it('Route should not render on wrong pathname', () => {
        route.navigate('/another_path');
        expect(route._block).to.eq(null);
    });

    it('Route should render on correct pathname', () => {
        route.navigate(pathname);
        expect(route._block?.getContent().innerHTML).to.eq('Route, id: 123, value: some value');
    });

    it('Route should be null after leave()', () => {
        route.leave();
        expect(route._block).to.eq(null);
    });
});
