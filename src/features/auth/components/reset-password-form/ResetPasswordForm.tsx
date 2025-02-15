import { UseFormHandleSubmit, SubmitHandler } from 'react-hook-form';

import Button from 'components/button/Button';
import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import Show from 'components/show/Show';
import { VERIFICATION_CODE_LENGTH } from 'constants/verificationCodeLength';
import ResetPasswordPageActions from 'features/auth/components/reset-password-page-actions/ResetPasswordPageActions';
import {
    RESET_PASSWORD_FORM_FIELD_NAMES,
    RESET_PASSWORD_FORM_FIELD_LABELS,
} from 'features/auth/constants/resetPasswordForm.constants';
import styles from 'features/auth/styles/AuthForm.module.scss';
import { TResetPasswordFormValues } from 'features/auth/types/resetPasswordFormValues';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

interface IResetPasswordFormProps {
    isLoading: boolean;
    isDirty: boolean;
    isVerificationCodeSent?: boolean;
    error: string | null;
    submit: (data: TResetPasswordFormValues) => void;
    handleSubmit: UseFormHandleSubmit<TResetPasswordFormValues, undefined>;
}

export default function ResetPasswordForm({
    isLoading,
    isDirty,
    isVerificationCodeSent,
    error,
    submit,
    handleSubmit,
}: IResetPasswordFormProps): JSX.Element {
    const [getVerificationCodeButtonText] = useGetFeatureTranslations({
        featureName: 'ResetPassword',
        keys: ['get-verification-code-button'],
    });

    const onSubmit: SubmitHandler<TResetPasswordFormValues> = (data) => {
        submit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <Fieldset
                actions={
                    <ResetPasswordPageActions
                        isLoading={isLoading}
                        isSubmitDisabled={!isDirty}
                        isSubmitHidden={!isVerificationCodeSent}
                    />
                }
            >
                <ErrorMessage
                    message={error}
                    className={styles['error-message']}
                />

                <FormTextField
                    type="email"
                    name={RESET_PASSWORD_FORM_FIELD_NAMES.email}
                    label={RESET_PASSWORD_FORM_FIELD_LABELS.email}
                    disabled={isVerificationCodeSent}
                    required={true}
                />
                <Show when={!isVerificationCodeSent}>
                    <Button
                        text={getVerificationCodeButtonText}
                        type="submit"
                        isLoading={isLoading}
                        variant="contained"
                    />
                </Show>

                <Show when={!!isVerificationCodeSent}>
                    <FormTextField
                        type="password"
                        name={RESET_PASSWORD_FORM_FIELD_NAMES.newPassword}
                        label={RESET_PASSWORD_FORM_FIELD_LABELS.newPassword}
                        required={true}
                    />
                    <FormTextField
                        type="password"
                        name={
                            RESET_PASSWORD_FORM_FIELD_NAMES.confirmNewPassword
                        }
                        label={
                            RESET_PASSWORD_FORM_FIELD_LABELS.confirmNewPassword
                        }
                        required={true}
                    />
                    <FormTextField
                        type="number"
                        maxLength={VERIFICATION_CODE_LENGTH}
                        name={RESET_PASSWORD_FORM_FIELD_NAMES.verificationCode}
                        label={
                            RESET_PASSWORD_FORM_FIELD_LABELS.verificationCode
                        }
                        required={true}
                    />
                </Show>
            </Fieldset>
        </form>
    );
}
