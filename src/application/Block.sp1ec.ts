import Block from './Block';
import {expect} from 'chai';
import * as Handlebars from 'handlebars';

describe('Block', () => {
    interface TestBlockProps {
        id: number,
        someProp: string
    }

    class TestComponent extends Block<TestBlockProps> {
        constructor(props: TestBlockProps) {
            super(props);
        }

        get _props() {
            return this.props;
        }

        render(){
            return this.compile(Handlebars.compile('<div></div>'), this.props);
        }
    }

    const testComponent = new TestComponent({
        id: 123,
        someProp: 'Test value'
    });

    it('Get TestComponent props', () => {
        expect(testComponent._props.someProp).to.eq('Test value');
    });
});
