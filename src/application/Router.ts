import Route, {CBlock} from './Route';

class Router {
    private static __instance: Router;

    private routes: Route[];
    private history: History;
    private currentRoute: Nullable<Route>;
    private rootQuery: string;
    private pathnames: string[];

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;
        this.pathnames = [];

        Router.__instance = this;
    }

    public use(pathname: string, block: CBlock, props?: TProps): Router {
        const route: Route = new Route(pathname, block, {...props, rootQuery: this.rootQuery});
        this.routes.push(route);
        this.pathnames.push(pathname);
        return this;
    }

    public start(): void {
        window.onpopstate = (e: PopStateEvent) => {
            const pathname = this.hasRoute((e.currentTarget as Window).location.pathname)
            this.onRoute(pathname);
        }
        const pathname = this.hasRoute(window.location.pathname)
        this.onRoute(pathname);
    }

    private hasRoute(pathname: string){
        return (this.pathnames.includes(pathname)) ? pathname : '*';
    }

    private onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        if(route){
            route.render();
        }
    }

    public go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }

    private getRoute(pathname: string): Nullable<Route> {
        return this.routes.find(route => route.match(pathname)) || null;
    }

    public getParams() {
        console.log(this.currentRoute!.routepathname)
        return {params: {test: 123}};
    }
}

export default Router;
