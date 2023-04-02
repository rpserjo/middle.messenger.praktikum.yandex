import Input from '../../components/input';
import Block from '../Block';

const validate = (input: Input) => {
    const { value } = input;
    const { validation } = input;
    const rules: Record<string, any> = {
        login: {
            pattern: '^(?=.*[A-Za-z])[A-Za-z0-9_\\\\-]{3,20}$',
            errorMessage: 'Only letters and numbers, from 3 to 20 characters',
        },
        password: {
            pattern: '^(?=\\D*\\d)(?=.*[A-Z]).{8,40}$',
            errorMessage: 'From 8 to 40 characters. At least 1 uppercase and 1 digit',
        },
        name: {
            pattern: '(^[A-ZА-Я]{1}[a-zа-я\\-]{1,14}$)',
            errorMessage: 'First letter is capital, max 14 letters',
        },
        email: {
            pattern: '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)',
            errorMessage: 'Wrong email',
        },
        phone: {
            pattern: '^[0-9+][0-9]{10,15}$',
            errorMessage: 'From 10 to 15 digits. Starts with +',
        },
        message: {
            pattern: '(.*)$',
            errorMessage: 'msg',
        },
    };

    const validationStatus = { isValid: true, validationError: '' };

    if (validation?.required === true && value.length === 0) {
        validationStatus.isValid = false;
        validationStatus.validationError = 'Required field';
        return validationStatus;
    }

    if (validation.equals) {
        // @ts-ignore
        const { target, errorMessage } = validation.equals;
        if (value !== target.value) {
            validationStatus.isValid = false;
            validationStatus.validationError = errorMessage;
        } else {
            validationStatus.isValid = true;
            validationStatus.validationError = '';
        }
        return validationStatus;
    }

    if (validation.rule && value.length > 0) {
        if (rules[validation.rule as string]) {
            const regexp = new RegExp(rules[validation.rule as string].pattern, 'g');
            if (!regexp.test(value)) {
                validationStatus.isValid = false;
                validationStatus.validationError = rules[validation.rule as string].errorMessage;
            } else {
                validationStatus.isValid = true;
                validationStatus.validationError = '';
            }
        } else {
            validationStatus.isValid = false;
            validationStatus.validationError = 'Validation rule is missing';
        }
    }

    return validationStatus;
};

const validateForm = (inputs: Block<TProps>[] = []) => {
    const formValidation: Set<boolean> = new Set<boolean>();
    const formData: Record<string, any> = {};
    inputs.forEach((input: Input) => {
        const status = validate(input);
        if (status.isValid) {
            formValidation.add(true);
            formData[input.name] = input.value;
            input.toggleError();
        } else {
            formValidation.add(false);
            input.toggleError(status.validationError);
        }
    });
    if (!formValidation.has(false) && formValidation.has(true)) {
        return formData;
    }
    return false;
};

export { validate, validateForm };
