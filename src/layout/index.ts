import template from './layout.hbs';
import './layout.css';
import Block from '../utils/Block';
import Input from '../components/input';
import Form from '../components/form';
import Button from '../components/button';

class Layout extends Block {
    constructor(props: Record<string, any>) {
        super('div', props, 'Layout');
    }
    
    
    
    created(){
    	/*
    	const submitHandler = (e, props) => {
    		e.preventDefault();
			console.log(this.name, 'Submithandler', props)
			console.log(this)  	
    	}
    	
    	const input1 = new Input({label: 'Input 1', placeholder: 'Input 1'});
    	const input2 = new Input({label: 'Input 2', placeholder: 'Input 2'});
    	const button = new Button({buttonLabel: 'Sign in', events: {click: submitHandler.bind(this)}});*/
    	/*const input3 = new Input({label: 'Input 3', placeholder: 'Input 3'});
    	const input4 = new Input({label: 'Input 4', placeholder: 'Input 4'});*/
    	/*
    	const form = new Form({
    		formLabel: 'Sign in',
    		formData: [
    			input1, input2, button
    		]
    	});
    	
    	this.children = {layout: [form]}*/
		//console.log(this.name, 'Props in create()', this.props);
		//this.children = {layout: [input1, input2, input3], layout2: input4};
		//this.children = {layout2: input1}
		/*this.setProps({
			layout3: 'input 3'
		})*/
		//console.log(this.name, 'Props in create() - 2', this.props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
export default Layout;
