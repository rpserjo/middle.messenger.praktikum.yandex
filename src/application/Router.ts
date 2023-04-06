import Route, {CBlock} from './Route';

interface RProps {
    pathname: string,
    block: CBlock,
    props?: TProps,
    onRoute?: () => void | undefined,
    onBeforeRoute?: () => any | undefined,
    routeGuard?: {
        guard: () => any | undefined,
        redirect: string
    }
}

interface RouteRecord {
    route: Route,
    pattern: RegExp,
    onRoute?: () => void | undefined,
    onBeforeRoute?: () => any | undefined,
    routeGuard?: {
        guard: () => any | undefined,
        redirect: string
    }
}

class Router {
    private static __instance: Router;

    private routes: RouteRecord[];
    private history: History;
    private currentRoute: Nullable<Route>;
    private rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.__instance = this;
    }

    public use(routeProps: RProps) {
        const route: Route = new Route(routeProps.pathname, routeProps.block, {...routeProps.props, rootQuery: this.rootQuery});
        const routePath: string = routeProps.pathname.replace('*', '');
        this.routes.push({
            route,
            pattern: new RegExp('^' + routePath.replace(/:\w+/g, '(\\w+)') + '$', 'g'),
            onRoute: (routeProps.onRoute) ? routeProps.onRoute : undefined,
            onBeforeRoute: (routeProps.onBeforeRoute) ? routeProps.onBeforeRoute : undefined,
            routeGuard: routeProps.routeGuard
        });

        return this;
    }

    public start(): void {
        document.addEventListener('click', (event: Event) => {
            const target = (event.target as HTMLElement).closest('a');
            if(target?.classList.contains('router-link')){
                event.preventDefault();
                const pathname = target.getAttribute('href');
                this.go(pathname as string);
            }
        });
        window.onpopstate = (event: PopStateEvent) => {
            this.onRoute((event.currentTarget as Window).location.pathname);
        }
        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string): void {
        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        let i = this.routes.length;
        let route = this.routes.find(route => route.route.routepathname === '*') || null;
        while(i--){
            const args = pathname.match(this.routes[i].pattern);
            if(args){
                route = this.routes[i];
            }
        }

        if(route){
            if(route.routeGuard){
                console.log('RG target', route.route.routepathname)
                route.routeGuard.guard().then(result => {
                    if(result === true){
                        this.executeRoute(route);
                        console.log('RG success')
                    }else{
                        console.log('RG fail, redirect to ', route!.routeGuard!.redirect)
                        this.go(route!.routeGuard!.redirect);
                    }
                }).catch(e => console.log(e))
            }else{
                this.executeRoute(route);
            }
        }
    }

    private executeRoute(route: RouteRecord): void {
        if(route.onRoute){
            route.onRoute();
        }
        this.currentRoute = route.route;
        this.currentRoute!.render();
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

    public getParams(): Record<string, string> {
        const path: string = this.currentRoute!.routepathname;
        const pathParts: string[] = path.split('/');
        pathParts.shift();
        const paramsKeys: (string | null)[] = [];
        pathParts.forEach((part: string) => {
            if(/:[A-Za-z0-9]/.test(part)){
                paramsKeys.push(part.replace(':', ''));
            }else{
                paramsKeys.push(null);
            }
        });
        const url: string = window.location.pathname;
        const urlParts: string[] = url.split('/')
        urlParts.shift();
        const params: Record<string, string> = {};
        urlParts.forEach((part, i) => {
            if(paramsKeys[i] && paramsKeys[i] !== null){
                params[paramsKeys[i] as string] = part;
            }
        });
        return params;
    }
}

export default Router;
