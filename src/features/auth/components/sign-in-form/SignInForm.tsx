import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import Show from 'components/show/Show';
import SignInPageActions from 'features/auth/components/sign-in-page-actions/SignInPageActions';
import { SIGN_IN_FORM_FIELD_NAMES } from 'features/auth/constants/signInForm.constants';
import { VERIFICATION_CODE_LENGTH } from 'features/auth/constants/verificationCodeLength';
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
                <FormTextField
                    type="email"
                    name={SIGN_IN_FORM_FIELD_NAMES.email}
                    label={SIGN_IN_FORM_FIELD_NAMES.email}
                    disabled={shouldShowVerificationCode}
                    required={true}
                />
                <FormTextField
                    type="password"
                    name={SIGN_IN_FORM_FIELD_NAMES.password}
                    label={SIGN_IN_FORM_FIELD_NAMES.password}
                    disabled={shouldShowVerificationCode}
                    required={true}
                />
                <Show when={!!shouldShowVerificationCode}>
                    <FormTextField
                        type="number"
                        maxLength={VERIFICATION_CODE_LENGTH}
                        name={SIGN_IN_FORM_FIELD_NAMES.tfaToken}
                        label={SIGN_IN_FORM_FIELD_NAMES.tfaToken}
                        disabled={shouldShowVerificationCode}
                        required={true}
                    />
                </Show>
            </Fieldset>
        </form>
    );
}
