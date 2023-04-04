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

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

class HTTPTransport {
    private queryString = (data: Record<string, string>) => {
        return `?${Object.entries(data).map((param) => `${param[0]}=${param[1]}`).join('&')}`;
    };

    protected get: HTTPMethod = (url, options = {}) => {
        const { data } = options;
        url = `${url}${this.queryString(data)}`;
        return this.request(url, { ...options, method: Methods.GET }, options.timeout);
    };

    protected post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.POST }, options.timeout);
    };

    protected put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.PUT }, options.timeout);
    };

    protected patch: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.PATCH }, options.timeout);
    };

    protected delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: Methods.DELETE }, options.timeout);
    };

    private request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method = Methods.GET, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.onload = () => {
                resolve(xhr);
            };

            if (method === Methods.GET) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default HTTPTransport;