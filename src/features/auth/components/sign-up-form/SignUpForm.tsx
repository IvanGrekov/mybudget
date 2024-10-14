import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import EmailField from 'features/auth/components/email-field/EmailField';
import PasswordField from 'features/auth/components/password-field/PasswordField';
import SignUpPageActions from 'features/auth/components/sign-up-page-actions/SignUpPageActions';
import {
    SIGN_UP_FORM_FIELD_NAMES,
    SIGN_UP_FORM_FIELD_LABELS,
} from 'features/auth/constants/signUpForm.constants';
import styles from 'features/auth/styles/AuthForm.module.scss';
import { TSignUpFormValues } from 'features/auth/types/signUpFormValues';

interface ISignUpFormProps {
    isLoading: boolean;
    isDirty: boolean;
    error: string | null;
    signUp: (data: TSignUpFormValues) => void;
    handleSubmit: UseFormHandleSubmit<TSignUpFormValues, undefined>;
}

export default function SignUpForm({
    isLoading,
    isDirty,
    error,
    signUp,
    handleSubmit,
}: ISignUpFormProps): JSX.Element {
    const onSubmit: SubmitHandler<TSignUpFormValues> = (data) => {
        signUp(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <Fieldset
                actions={
                    <SignUpPageActions
                        isLoading={isLoading}
                        isSubmitDisabled={!isDirty}
                    />
                }
            >
                <ErrorMessage
                    message={error}
                    className={styles['error-message']}
                />
                <EmailField
                    name={SIGN_UP_FORM_FIELD_NAMES.email}
                    label={SIGN_UP_FORM_FIELD_LABELS.email}
                />
                <PasswordField
                    name={SIGN_UP_FORM_FIELD_NAMES.password}
                    label={SIGN_UP_FORM_FIELD_LABELS.password}
                />
                <PasswordField
                    name={SIGN_UP_FORM_FIELD_NAMES.confirmPassword}
                    label={SIGN_UP_FORM_FIELD_LABELS.confirmPassword}
                />
            </Fieldset>
        </form>
    );
}
