import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import Show from 'components/show/Show';
import EmailField from 'features/auth/components/email-field/EmailField';
import PasswordField from 'features/auth/components/password-field/PasswordField';
import SignInPageActions from 'features/auth/components/sign-in-page-actions/SignInPageActions';
import VerificationField from 'features/auth/components/verification-field/VerificationField';
import { SIGN_IN_FORM_FIELD_NAMES } from 'features/auth/constants/signInForm.constants';
import styles from 'features/auth/styles/AuthForm.module.scss';
import { SignInDto } from 'types/generated.types';

interface ISignInFormProps {
    isLoading: boolean;
    isDirty: boolean;
    shouldShowVerificationCode?: boolean;
    error: string | null;
    signIn: (data: SignInDto) => void;
    handleSubmit: UseFormHandleSubmit<SignInDto, undefined>;
}

export default function SignInForm({
    isLoading,
    isDirty,
    shouldShowVerificationCode,
    error,
    signIn,
    handleSubmit,
}: ISignInFormProps): JSX.Element {
    const onSubmit: SubmitHandler<SignInDto> = (data) => {
        signIn(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <Fieldset
                actions={
                    <SignInPageActions
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
                    name={SIGN_IN_FORM_FIELD_NAMES.email}
                    label={SIGN_IN_FORM_FIELD_NAMES.email}
                    disabled={shouldShowVerificationCode}
                />
                <PasswordField
                    name={SIGN_IN_FORM_FIELD_NAMES.password}
                    label={SIGN_IN_FORM_FIELD_NAMES.password}
                    disabled={shouldShowVerificationCode}
                />
                <Show when={!!shouldShowVerificationCode}>
                    <VerificationField />
                </Show>
            </Fieldset>
        </form>
    );
}
