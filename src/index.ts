import './index.css';
import Layout from './layout';
import renderDom from './application/utils/renderDom';
import router, { registerRouter } from './router/router';

const layout = new Layout();
renderDom('#root', layout);
registerRouter();
