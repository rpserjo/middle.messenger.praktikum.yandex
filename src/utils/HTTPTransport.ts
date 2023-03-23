enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

interface Options {
    method?: Methods,
    data?: any,
    headers?: Record<string, string>,
    timeout?: number
}

class HTTPTransport {
    private queryString = (data: Record<string, string>): string => {
        return `?${Object.entries(data).map((param) => `${param[0]}=${param[1]}`).join('&')}`;
    }
    
    protected get = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        const { data } = options;
        url = `${url}${this.queryString(data)}`;
        return this.request(url, {...options, method: Methods.GET}, options.timeout);
    }
    
    protected post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, {...options, method: Methods.POST}, options.timeout);
    }
    
    protected put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, {...options, method: Methods.PUT}, options.timeout);
    }
    
    protected patch = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, {...options, method: Methods.PATCH}, options.timeout);
    }
    
    protected delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, {...options, method: Methods.DELETE}, options.timeout);
    }
    
    private request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method, data, headers = {} } = options;
        
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            
            if(headers) {
                for(const header in headers) {
                    xhr.setRequestHeader(header, header[header]);
                }
            }
            
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.onload = () => {
                resolve(xhr);
            }
            
            if(method === Methods.GET) {
                xhr.send();
            }else{
                xhr.send(data);
            }
        });
    }
}

export default HTTPTransport;
