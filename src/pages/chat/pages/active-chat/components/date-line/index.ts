import template from './date-line.hbs';
import './date-line.css';
import Block from '../../../../../../utils/Block';

interface DateLineProps {
    date: string
}

class DateLine extends Block {
    constructor(props: DateLineProps) {
        super('div', props, 'DateLine');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DateLine;
