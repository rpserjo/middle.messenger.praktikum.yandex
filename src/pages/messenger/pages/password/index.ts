import template from './password.hbs';
import Block from '../../../../application/Block';
import Input from '../../../../components/input';
import { validate, validateForm } from '../../../../application/utils/validate';
import Button from '../../../../components/button';
import Link from '../../../../components/link';
import userController from '../../../../controllers/UserController';
import { ChangePasswordData } from '../../../../api/UserApi';

class Password extends Block {
    constructor(props: TProps) {
        super(props);
    }

    created() {
        const oldPasswordInput: Input = new Input({
            id: 'oldPassword',
            label: 'Current password',
            name: 'oldPassword',
            placeholder: 'Enter current password',
            type: 'password',
            validation: {
                required: true,
                rule: 'password',
            },
            events: {
                focusin: () => (oldPasswordInput as Input).toggleError(),
                focusout: () => {
                    (oldPasswordInput as Input).toggleError(validate(oldPasswordInput as Input).validationError);
                },
            },
        });

        const newPasswordInput: Input = new Input({
            id: 'newPassword',
            label: 'New password',
            name: 'newPassword',
            placeholder: 'Enter new password',
            type: 'password',
            validation: {
                required: true,
                rule: 'password',
            },
            events: {
                focusin: () => (newPasswordInput as Input).toggleError(),
                focusout: () => {
                    (newPasswordInput as Input).toggleError(validate(newPasswordInput as Input).validationError);
                },
            },
        });

        const repeatNewPasswordInput: Input = new Input({
            id: 'repeatNewPassword',
            label: 'Repeat new password',
            name: 'repeatNewPassword',
            placeholder: 'Repeat new password',
            type: 'password',
            validation: {
                equals: { target: newPasswordInput, errorMessage: 'Passwords not match' },
            },
            events: {
                focusin: () => (repeatNewPasswordInput as Input).toggleError(),
                focusout: () => {
                    (repeatNewPasswordInput as Input).toggleError(validate(repeatNewPasswordInput as Input).validationError);
                },
            },
        });

        const submitHandler = async (e: Event, inputs: Input[]) => {
            e.preventDefault();
            const formData = validateForm(inputs);
            if (formData) {
                console.log(formData);
                await userController.changePassword(formData as ChangePasswordData);
            }
        };

        const submitButton = new Button({
            buttonLabel: 'Change password',
            events: {
                click: (e: Event) => {
                    const inputs = Object.values(this.children).filter((child: Block) => child instanceof Input);
                    submitHandler(e, inputs as Input[]);
                },
            },
        });

        const cancelLink = new Link({
            label: 'Cancel',
            to: '/settings',
            routerLink: true,
        });

        this.children = {
            oldPasswordInput,
            newPasswordInput,
            repeatNewPasswordInput,
            submitButton,
            cancelLink,
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Password;
