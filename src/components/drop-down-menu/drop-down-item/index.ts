import template from './drop-down-item.hbs';
import './drop-down-item.css';
import Icon from '../../icon';
import Block from '../../../application/Block';

interface DropDownProps {
    itemIcon?: Icon,
    itemLabel?: string,
    events?: Record<string, Function>
}

class DropDownItem extends Block {
    constructor(props: DropDownProps = {}) {
        super('div', props, 'DropDownItem');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DropDownItem;
