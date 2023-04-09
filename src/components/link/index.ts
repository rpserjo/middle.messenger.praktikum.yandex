import template from './link.hbs';
import './link.css';
import Block from '../../application/Block';
import router from '../../router/router';

interface LinkProps{
    type?: string,
    to?: string,
    label: string | typeof Block,
    classList?: string[] | string,
    events?: Record<string, Function>,
    routerLink?: boolean
}
class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props, 'Link');
    }

    created() {
        const type = this.props.type || 'link';
        const classList = (this.props.classList && Array.isArray(this.props.classList)) ? [...this.props.classList, type].join(' ') : type;
        this.setProps({ classList });
        if(this.props.routerLink){
            this.props.events = {
                ...this.props.events,
                click: (e: Event) => {
                    e.preventDefault();
                    router.go(this.props.to)
                }
            };
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Link;
