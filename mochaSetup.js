const { JSDOM } = require('jsdom');

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
global.window = dom.window;
global.document = dom.window.document;
