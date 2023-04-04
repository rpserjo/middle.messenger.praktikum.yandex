import template from './drop-down-menu.hbs';
import './drop-down-menu.css';
import Block from '../../application/Block';
import DropDownItem from './drop-down-item';
import Icon from '../icon';

interface DropDownMenuProps {
    dropDownMenuIcon: string,
    dropDownMenuItems: Record<string, any>,
    dropDownMenuTitle?: string,
    position?: Record<string, number>,
    hidden?: boolean
}
class DropDownMenu extends Block<DropDownMenuProps> {
    constructor(props: DropDownMenuProps) {
        super(props, 'DropDownMenu');
    }

    created() {
        const dropDownMenuButton = new Icon({
            icon: this.props.dropDownMenuIcon,
            events: {
                click: () => this.element?.querySelector('.drop-down-menu__list')?.classList.toggle('hidden'),
            },
        });
        const dropDownMenuList = this.props.dropDownMenuItems.map((item: Record<string, any>) => new DropDownItem({
            itemLabel: item?.label,
            itemIcon: new Icon({ icon: item.icon }),
            events: item.events,
        }));

        this.children = {
            dropDownMenuButton,
            dropDownMenuList,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DropDownMenu;
