    class Route{
    constructor(pathname, target){
    this._pathname = pathname;
    this._target = target;
}

    get path(){
    return this._pathname;
}

    getPathname() {
    return this._pathname;
}

    get target(){
    return this._target;
}
}

    class Router{
    _routes = [];

    constructor(){
    if(Router.__instance){
    return Router.__instance;
}

    this._routes = [];
    this._pathnames = [];
    this.history = window.history;

    this._currentRoute = null;
    Router.__instance = this;
}

    use(routes) {
    if(Array.isArray(routes)){
    routes.forEach(route => this._pushRoute(route));
}else{
    this._pushRoute(routes);
}

    return this;
}

    _pushRoute(routes){
    for(let route in routes){
    const r = new Route(route, routes[route]);
    route = route.replace('*', '')
    this._routes.push({
    route: r,
    pattern: new RegExp('^' + route.replace(/:\w+/g, '(\\w+)') + '$', 'g')
});
}
}

    navigate(path){
    let i = this._routes.length;
    let route = this._routes.filter(route => route.route.path === '*')[0] || null;
    while(i--){
    const args = path.match(this._routes[i].pattern);
    console.log(path, args, this._routes[i].pattern)
    if(args){
    route = this._routes[i];
}
}
    this._onRoute(route);
}

    start(){
    window.onpopstate = event => {
    this.navigate(event.currentTarget.location.hash);
}

    this.navigate(window.location.hash);
}

    _onRoute(route){
    if(!route){
    return;
}
    this._currentRoute = route;
    const {id, page, comments} = this.getParams();
    console.log(route.route.target, id, page, comments)
}

    getParams(){
    const path = this._currentRoute.route.path;
    const pathParts = path.replace('#', '').split('/');
    pathParts.shift();
    const paramsKeys = [];
    pathParts.forEach(part => {
    if(/:[A-Za-z0-9]/.test(part)){
    paramsKeys.push(part.replace(':', ''));
}else{
    paramsKeys.push(null);
}
});
    const url = window.location.hash;
    const urlParts = url.split('/')
    urlParts.shift();
    const params = {};
    const paramsValues = [];
    urlParts.forEach((part, i) => {
    if(paramsKeys[i] !== null){
    params[paramsKeys[i]] = part;
}
});
    return params;
}
}

    const router = new Router();

    /*		router.use({'/': 'Index'}).use({'#/articles': 'Articles'}).use({'#/articles/:id/:page/:comments': 'Articles'}).use({'*': 'Not found'}).start();
    */
    router.
    use({'#/': 'Index'}).
    use([
    {
        '#/articles': 'Articles'
    },
    {
        '#/articles/:id/:page/:comments': 'Articles'
    },
    {
        '*': 'Not found'
    }
    ]).start();
