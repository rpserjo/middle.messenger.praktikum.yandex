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
    timeout?: number,
    multipartForm?: boolean
}

export type HTTPResponse = {
    reason?: string,
    code: number,
    response: string
}

type HTTPMethod = (url: string, options?: Options) => Promise<Record<string, any>>;

class HTTPTransport {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    private queryString = (data: Record<string, string>) => {
        return (data) ? `?${Object.entries(data).map((param) => `${param[0]}=${param[1]}`).join('&')}` : '';
    };

    public get: HTTPMethod = (url, options = {}) => {
        const { data = null } = options;
        url = `${url}${this.queryString(data)}`;
        return this.request(url, { ...options, method: Methods.GET }, options.timeout);
    };

    public post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.POST }, options.timeout);
    };

    public put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.PUT }, options.timeout);
    };

    public patch: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.PATCH }, options.timeout);
    };

    public delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.DELETE }, options.timeout);
    };

    private request = (url: string, options: Options, timeout = 5000): Promise<Record<string, any>> => {
        const {
            method = Methods.GET, data, headers = {}, multipartForm = false,
        } = options;
        url = this.apiUrl + url;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onabort = () => reject({ reason: 'Request aborted' });
            xhr.onerror = () => reject({ reason: 'Request failed' });
            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.onload = () => {
                let response;
                try {
                    response = JSON.parse(xhr.response);
                } catch {
                    response = xhr.response;
                }

                if (xhr.status < 400) {
                    resolve({
                        status: xhr.status,
                        response,
                    });
                } else {
                    reject({
                        reason: 'Bad response',
                        status: xhr.status,
                        response,
                    });
                }
            };

            if (method === Methods.GET) {
                xhr.send();
            } else if (multipartForm === true) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
