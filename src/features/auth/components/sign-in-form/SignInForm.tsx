import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import Button from 'components/button/Button';
import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import Link from 'components/link/Link';
import Show from 'components/show/Show';
import EmailField from 'features/auth/components/email-field/EmailField';
import PasswordField from 'features/auth/components/password-field/PasswordField';
import styles from 'features/auth/components/sign-in-form/SignInForm.module.scss';
import VerificationField from 'features/auth/components/verification-field/VerificationField';
import { EAppRoutes } from 'types/appRoutes';
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
                    <>
                        <Link
                            href={`${EAppRoutes.Auth}${EAppRoutes.SignUp}`}
                            text="Sign Up"
                        />
                        {/* <Button text="Register Now" isLoading={isLoading} /> */}
                        <Button
                            text="Sign In"
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={!isDirty}
                        />
                    </>
                }
            >
                <ErrorMessage
                    message={error}
                    className={styles['error-message']}
                />
                <EmailField disabled={shouldShowVerificationCode} />
                <PasswordField disabled={shouldShowVerificationCode} />
                <Show when={!!shouldShowVerificationCode}>
                    <VerificationField />
                </Show>
            </Fieldset>
        </form>
    );
}
