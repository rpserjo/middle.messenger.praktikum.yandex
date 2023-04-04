import template from './spinner.hbs';
import './spinner.css';
import Block from '../../application/Block';
import {withStore} from '../../application/Store';

interface SpinnerProps {
    isLoading: boolean
}
class SpinnerBlock extends Block {
    constructor(props: SpinnerProps) {
        super('div', props, 'Spinner');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const Spinner = withStore(SpinnerBlock, (state: Indexed) => {
    return {
        isLoading: state.isLoading
    }
});
