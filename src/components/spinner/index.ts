import template from './spinner.hbs';
import './spinner.css';
import Block from '../../application/Block';
import { State, withStore } from '../../application/Store';

interface SpinnerProps{
    isLoading: boolean
}

class SpinnerBlock extends Block<SpinnerProps> {
    constructor(props: SpinnerProps = { isLoading: false }) {
        super(props, 'Spinner');
    }

    updated() {

    }

    render() {
        return this.compile(template, this.props);
    }
}

export const Spinner = withStore(SpinnerBlock, (state: State) => {
    return {
        isLoading: state.isLoading,
    };
});
