import HTTPTransport from '../application/HTTPTransport.ts';
import API from './Api.ts';

abstract class BaseApi {
    protected http: HTTPTransport;
    
    protected constructor(endpoint: string){
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
