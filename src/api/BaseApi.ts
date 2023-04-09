import HTTPTransport from '../application/HTTPTransport';
import API from './Api';

abstract class BaseApi {
    protected http: HTTPTransport;
    
    constructor(endpoint: string){
        this.http = new HTTPTransport(API.HOST + endpoint);
    }
}

export default BaseApi;
