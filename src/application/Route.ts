import Block from './Block';
import render from './utils/renderDom';

export interface CBlock<TProps extends Record<string, any> = any> {
    new(props?: TProps): Block<TProps>;
}

class Route {
    private pathname: string;

    private blockClass: CBlock;

    private block: Block | null;

    private props: TProps;

    constructor(pathname: string, view: CBlock, props: TProps) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }

    public navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave() {
        if (this.block) {
            this.block.hide();
            this.block = null;
        }
    }

    public match(pathname: string): boolean {
        return this.pathname === pathname;// isEqual(pathname, this._pathname);
    }

    public render(): void {
        if (!this.block) {
            this.block = new this.blockClass(this.props);   // eslint-disable-line
            render(this.props.rootQuery, this.block!);
            return;
        }

        this.block.show(true);
    }

    get routepathname(): string {
        return this.pathname;
    }
}

export default Route;
