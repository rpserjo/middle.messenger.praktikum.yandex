const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.hbs'] = function (module, filename) {
    const contents = fs.readFileSync(filename, 'utf-8');
    module.exports = Handlebars.compile(contents);
}

require.extensions['.css'] = function () {
    module.exports = () => ({});
}
