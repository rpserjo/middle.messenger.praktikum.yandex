import HTTPTransport from '../application/HTTPTransport';
import API from './Api';

abstract class BaseApi {
    protected http: HTTPTransport;
    
    constructor(endpoint: string){
        this.http = new HTTPTransport(API.HOST + endpoint);
    }

    public create() {
        throw new Error('Method not implemented');
    }

    public read() {
        throw new Error('Method not implemented');
    }

    public update() {
        throw new Error('Method not implemented');
    }

    public delete() {
        throw new Error('Method not implemented');
    }
}

export default BaseApi;
