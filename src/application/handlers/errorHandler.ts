import toastController from '../../controllers/ToastController';

const errorHandler = (error: Record<string, any>): void => {
    console.log(error);
    const { reason, status = 0, response } = error;
    if (status > 0) {
        const message = response.reason ?? reason;
        toastController.setDanger(`Error ${status}: ${message}`);
    } else {
        toastController.setDanger(reason);
    }
    console.log(reason, status, response);
};

export default errorHandler;
