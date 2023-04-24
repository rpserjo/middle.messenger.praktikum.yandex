import { expect } from 'chai';
import { useFakeXMLHttpRequest, SinonFakeXMLHttpRequest } from 'sinon';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport class', () => {
    const requests: SinonFakeXMLHttpRequest[] = [];
    const xhr = useFakeXMLHttpRequest();
    const instance = new HTTPTransport('/auth');
    // @ts-ignore
    global.XMLHttpRequest = xhr;
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => { requests.push(request); };

    afterEach(() => { requests.length = 0; });

    it('.get() should send GET request', () => {
        instance.get('/user');
        const [request] = requests;
        expect(request.method).to.eq('GET');
    });

    it('.post() should send POST request', () => {
        instance.post('/user');
        const [request] = requests;
        expect(request.method).to.eq('POST');
    });
});
