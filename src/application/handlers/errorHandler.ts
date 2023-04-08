import toastController from '../../controllers/ToastController';

const errorHandler = (error: Record<string, any>): void => {
    const {reason, status = 0, response} = error;
    if(status > 0){
        let message = reason;
        try{
            const json = JSON.parse(response);
            message = json.reason;
        }catch(e){
            console.log('Error handler error', e);
            message = response;
        }
        toastController.setDanger(`Error ${status}: ${message}`);
    }else{
        toastController.setDanger(reason);
    }
    console.log(reason, status, response);
}

export default errorHandler;
