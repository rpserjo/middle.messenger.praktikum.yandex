import Block from './Block';
import {expect} from 'chai';
import * as Handlebars from 'handlebars';

describe('Block', () => {
    let componentWasCreated: boolean = false;    
    let componentWasMounted: boolean = false;
    let componentWasRendered: boolean = false;
    /*let componentWasUpdated: boolean = false;*/
    
    interface TestBlockProps {
        id: number,
        someProp: string
    }

    class TestComponent extends Block<TestBlockProps> {
        constructor(props: TestBlockProps) {
            super(props);
        }
        
        created() {
            componentWasCreated = true;
        }
        
        mounted() {
            componentWasMounted = true;
        }

        get _props() {
            return this.props;
        }

        render() {
            componentWasRendered = true;
            return this.compile(Handlebars.compile('<div></div>'), this.props);
        }
    }

    const testComponent = new TestComponent({
        id: 123,
        someProp: 'Test value'
    });

    it('Get TestComponent props', () => {
        expect(testComponent._props.someProp).to.eq('Test value');
        expect(testComponent._props.id).to.eq(123);
    });
    
    it('Check lifecycle hooks', () => {
        expect(componentWasCreated).to.eq(true);
        //testComponent.dispatchComponentDidMount();
        expect(componentWasMounted).to.eq(true);
        expect(componentWasRendered).to.eq(true);
    });
});
