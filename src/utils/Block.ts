import EventBus from './EventBus';
import {v4 as makeUUID} from 'uuid';

enum Events {
    INIT = 'flow:init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:component-did-render'
}

abstract class Block {
    private element: HTMLElement | null;

    private meta: {tagName: string, props: Record<string, any>};

    public uuid: string;

    private children: Block[];

    public props: Record<string, any>;

    private eventBus: EventBus;

    private name: string;

    constructor(tagName: string = 'div', propsAndChildren: Record<string, any> = {}, name: string = 'not set') {
        const {children, props} = this.getPropsAndChildren(propsAndChildren);
        this.children = children;
        this.name = name;
        this.meta = {
            tagName,
            props,
        };
        this.uuid = makeUUID();
        this.props = this.makeProxyProps({...props, __id: this.uuid});
        this.eventBus = new EventBus();
        this.registerLifecycleEvents();
        this.eventBus.emit(Events.INIT);
    }

    private getPropsAndChildren(propsAndChildren: Record<string, any>) {
        const children = {};
        const props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            }else if(Array.isArray(value) && value.every(val => val instanceof Block)){
            	children[key] = value;
            }else{
                props[key] = value;
            }
        });

        return {children, props};
    }

    private makeProxyProps(props: Record<string, any>) {
        self = this;
       // console.log(this.name, 'SELF', this, self)
        return new Proxy(props, {
            get(target: Record<string, any>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, any>, prop: string, value: unknown) {
                console.log(self.name, 'SET', self, prop, value)
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
    }

    private componentDidUpdate(oldProps, newProps): void {
        if (oldProps !== newProps) {
            this.updated();
            this.eventBus.emit(Events.FLOW_RENDER);
            /* Object.keys(this.children).forEach((child: Block | Block[]) => {
                if(Array.isArray(this.children[child])){
                    this.children[child].forEach(grandChild => grandChild.componentDidUpdate(oldProps, newProps))
                }else{
                    this.children[child].componentDidUpdate(oldProps, newProps);
                }
            });*/
        }
    }

    private _render(): void {
        console.log(this.name, 'RENDER')
        const block = this.render();    // documentFragment
        // this.removeEvents();
        this.element.innerHTML = '';
        this.element.appendChild(block);
        //this.element.replaceChildren(block);
        //this.element = block;
        //this.element.innerHTML = block;
        this.addEvents();
    }

    private addEvents(): void {
        const { events = {} } = this.props;
        const { childEvents = [] } = this.props;
        Object.keys(events).forEach((event: string) => {
            this.element.addEventListener(event, events[event]);
        });
        childEvents.forEach((childEvent) => {
           this.element.querySelector(childEvent.selector).addEventListener(childEvent.event, childEvent.callback);
        });
    }

    get getElement(): HTMLElement {
        return this.element;
    }

    getContent(): HTMLElement {
        return this.element;
    }

    setProps(props: Record<string, any>): void {
        if (!props) {
            return;
        }
        Object.assign(this.props, props);
    }

    compile(template, props){
        const propsAndStubs = { ...props }; //???

        Object.entries(this.children).forEach(([key, child]) => {
        		if(Array.isArray(child)){
					propsAndStubs[key] = child.map(grandChild => {
						return `<div data-t="grandChild" data-id="${grandChild.uuid}"></div>`;
					});        		
        		}else{
        			propsAndStubs[key] = `<div data-t="child" data-id="${child.uuid}"></div>`;
        		}
        });

        const fragment: DocumentFragment = this.createDocumentElement('template');
        fragment.innerHTML = template(propsAndStubs);
        Object.values(this.children).forEach((child) => {
        	if(Array.isArray(child)){
				child.forEach(grandChild => {
                    const stub = fragment.content.querySelector(`[data-id="${grandChild.uuid}"]`);
           		    stub.replaceWith(grandChild.getContent());
				})        	
        	}else{
        	 	const stub = fragment.content.querySelector(`[data-id="${child.uuid}"]`);
                stub.replaceWith(child.getContent());
        	}
          
        });
        return fragment.content;//.firstElementChild;
    }

    init(): void {
        this.createResources();
        this.created();
        this.eventBus.emit(Events.FLOW_CDM);
        this.eventBus.emit(Events.FLOW_RENDER);
    }

    created() {}
    mounted() {}
    render() {}
    updated() {}

    dispatchComponentDidMount(): void {
        this.eventBus.emit(Events.FLOW_CDM);
        Object.keys(this.children).forEach((child: Block | Block[]) => {
            if(Array.isArray(this.children[child])){
                this.children[child].forEach(grandChild => grandChild.dispatchComponentDidMount())
            }else{
                this.children[child].dispatchComponentDidMount();
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
