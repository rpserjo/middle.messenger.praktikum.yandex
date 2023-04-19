import * as Handlebars from 'handlebars';
import { expect } from 'chai';

import { JSDOM } from 'jsdom';
import Block from './Block';
import Route, { CBlock } from './Route';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });

global.document = dom.window.document;

describe('Route', () => {
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

    it('Check route don`t renders on wrong pathname', () => {
        route.navigate('/another_path');
        expect(route._block).to.eq(null);
    });

    it('Check route renders on pathname', () => {
        route.navigate(pathname);
        expect(route._block?.getContent().innerHTML).to.eq('Route, id: 123, value: some value');
    });

    it('Check route leave()', () => {
        route.leave();
        expect(route._block).to.eq(null);
    });
});
