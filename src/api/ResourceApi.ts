import BaseApi from './BaseApi';
import API from './Api';

class ResourceApi extends BaseApi {
    constructor() {
        super(API.RESOURCES_UPLOAD);
    }

    public getResource(path: string) {
        return this.http.getBlob(`/${path}`);
    }

    public uploadImage(data: File) {
        const formData = new FormData();
        formData.append('resource', data);
        return this.http.post('', {
            data: formData,
            multipartForm: true,
        });
    }
}

const resourceApi = new ResourceApi();

export default resourceApi;
