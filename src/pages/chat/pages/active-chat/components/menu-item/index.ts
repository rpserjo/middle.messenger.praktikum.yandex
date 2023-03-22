import template from './menu-item.hbs';
import './menu-item.css';
import Block from '../../../../../../utils/Block.ts';

class MenuItem extends Block {
	constructor(props){
		super('div', props, 'MenuItem');	
	}
	
	render() {
		return this.compile(template, this.props);
	}
}

export default MenuItem;
