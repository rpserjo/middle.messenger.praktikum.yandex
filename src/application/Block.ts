import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

enum Events {
    INIT = 'flow:init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:component-did-render'
}

abstract class Block<TProps extends Record<string, any> = any> {
    protected element: Nullable<HTMLElement> = null;

    private meta: {tagName: string, props: TProps};

    protected uuid: string;

    protected children: Record<string, Block | Block[]>;

    protected props: TProps;

    private eventBus: EventBus;

    private _name: string;

    protected constructor(tagName: string = 'div', propsAndChildren: TProps = {} as TProps, name: string = 'not set') {
        const { children, props } = this.getPropsAndChildren(propsAndChildren);
        this.children = children;
        this._name = name;
        this.meta = {
            tagName,
            props,
        };
        this.uuid = makeUUID();
        this.props = this.makeProxyProps({ ...props, __id: this.uuid, __name: this._name }) as TProps;
        this.eventBus = new EventBus();
        this.registerLifecycleEvents();
        this.eventBus.emit(Events.INIT);
    }

    private getPropsAndChildren(propsAndChildren: TProps = {} as TProps) {
        const children: Record<string, Block | Block[]> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value) && value.every((val) => val instanceof Block)) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props: props as TProps};
    }

    private makeProxyProps(props: TProps) {
        const self = this;
        return new Proxy(props, {
            get(target: Record<string, any>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, any>, prop: string, value: unknown) {
                const oldValue = target[prop];
                target[prop] = value;
                self.eventBus.emit(Events.FLOW_CDU, oldValue, target[prop]);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    private registerLifecycleEvents(): void {
        this.eventBus.on(Events.INIT, this.init.bind(this));
        this.eventBus.on(Events.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus.on(Events.FLOW_CDU, this.componentDidUpdate.bind(this));
        this.eventBus.on(Events.FLOW_RENDER, this._render.bind(this));
    }

    private createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this.uuid);
        element.style.display = 'contents';
        return element;
    }

    private createResources(): void {
        const { tagName } = this.meta;
        this.element = this.createDocumentElement(tagName);
    }

    private componentDidMount(): void {
        this.mounted();
        this.eventBus.emit(Events.FLOW_RENDER);
    }

    private componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        if (oldProps !== newProps) {
            this.updated();
            this.eventBus.emit(Events.FLOW_RENDER);
        }
    }

    private _render(): void {
        this.removeEvents();
        const block: DocumentFragment = this.render();
        this.element?.replaceChildren(block);
        this.addEvents();
    }

    private addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((event: string) => {
            this.element?.addEventListener(event, events[event]);
        });
    }

    private removeEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((event: string) => {
            this.element?.removeEventListener(event, events[event]);
        });
    }

    get getElement(): HTMLElement {
        return this.element as HTMLElement;
    }

    getContent(): HTMLElement {
        return this.element as HTMLElement;
    }

    setProps(props: TProps): void {
        if (!props) {
            return;
        }
        Object.assign(this.props, props);
    }

    compile(template: Function, props: Record<string, unknown>) {
        const propsAndStubs = { ...props }; // ???

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map((grandChild) => `<div data-id="${grandChild.uuid}"></div>`);
            } else {
                propsAndStubs[key] = `<div data-id="${child.uuid}"></div>`;
            }
        });

        const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndStubs);
        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((grandChild) => {
                    const stub = fragment.content.querySelector(`[data-id="${grandChild.uuid}"]`);
                    stub?.replaceWith(grandChild.getContent());
                });
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child.uuid}"]`);
                stub?.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    private init(): void {
        this.createResources();
        this.created();
        //this.eventBus.emit(Events.FLOW_CDM);
    }

    protected created() {}

    protected mounted() {}

    protected render() {
        return new DocumentFragment();
    }

    protected updated() {}

    dispatchComponentDidMount(): void {
        this.eventBus.emit(Events.FLOW_CDM);
        Object.keys(this.children).forEach((child: string) => {
            if (Array.isArray(this.children[child])) {
                (this.children[child] as Block[]).forEach((grandChild: Block) => grandChild.dispatchComponentDidMount());
            } else {
                (this.children[child] as Block).dispatchComponentDidMount();
            }
        });
    }

    show(): void {
        this.getContent().style.display = 'block';
    }

    hide(): void {
        this.getContent().style.display = 'none';
    }
}

export default Block;
