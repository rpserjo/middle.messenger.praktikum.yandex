import { expect } from 'chai';
import Router from './Router';
import Block from './Block';
import { CBlock } from './Route';

describe('Router class', () => {
    class TestPage extends Block {}
    let router: Router;

    beforeEach(() => {
        Router.__instance = null;
        router = new Router('#root');
    });

    it('use() should return Router instance', () => {
        const result = router.use({ pathname: '/', block: TestPage as CBlock });
        expect(result).to.eq(router);
    });

    it('should count history correctly', () => {
        router
            .use({ pathname: '/path1', block: TestPage as CBlock })
            .use({ pathname: '/path2', block: TestPage as CBlock })
            .use({ pathname: '/path3', block: TestPage as CBlock })
            .start();
        router.go('/path1');
        router.go('/path2');
        router.go('/path3');
        expect(global.window.history.length).to.eq(4);
    });

    it('pathname should be the same as in route', () => {
        const path = '/path-to-the-route';
        router
            .use({ pathname: path, block: TestPage as CBlock })
            .use({ pathname: '/path1', block: TestPage as CBlock })
            .start();
        router.go('/path-to-the-route');
        expect(global.window.location.pathname).to.eq(path);
    });

    it('test back/forward', () => {
        router
            .use({ pathname: '/path1', block: TestPage as CBlock })
            .use({ pathname: '/path2', block: TestPage as CBlock })
            .use({ pathname: '/path3', block: TestPage as CBlock })
            .start();
        router.back();
    });

    it('should read params from path', () => {
        router
            .use({ pathname: '/path-with-params/:id/:name', block: TestPage as CBlock })
            .start();
        router.go('/path-with-params/123/MyName');
        const obj = { id: '123', name: 'MyName' };
        expect(router.getParams()).to.eql(obj);
    });
});
