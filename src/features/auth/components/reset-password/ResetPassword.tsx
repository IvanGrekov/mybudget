'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { resetPassword } from 'actions/resetPassword';
import { usePageLoading } from 'contexts/PageLoadingContext';
import { RESET_PASSWORD_FORM_VALIDATION } from 'features/auth/components/reset-password/constants/resetPasswordFormValidation';
import ResetPasswordForm from 'features/auth/components/reset-password-form/ResetPasswordForm';
import { TResetPasswordFormValues } from 'features/auth/types/resetPasswordFormValues';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { getFailedResponseMessage } from 'utils/failedResponse.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

export default function ResetPassword(): JSX.Element {
    const { setIsLoading } = usePageLoading();
    const [error, setError] = useState<string | null>(null);
    const [requiredFieldsErrorText] = useGetFeatureTranslations({
        featureName: 'ResetPassword',
        keys: ['required_fields_error'],
    });

    const methods = useForm<TResetPasswordFormValues>({
        defaultValues: {
            email: '',
            isVerificationCodeSent: false,
            newPassword: '',
            confirmNewPassword: '',
            verificationCode: '',
        },
        resolver: RESET_PASSWORD_FORM_VALIDATION,
    });

    const { formState, setValue, handleSubmit, watch } = methods;

    const submit = async ({
        isVerificationCodeSent,
        email,
        newPassword,
        verificationCode,
    }: TResetPasswordFormValues): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            if (!isVerificationCodeSent) {
                await makeApiFetch({
                    url: '/authentication/initiate-reset-password',
                    method: 'POST',
                    body: { email },
                    apiUrl: process.env.NEXT_PUBLIC_API_CLIENT_URL,
                }).then(async (response) => {
                    if (!response.ok) {
                        const data = await response.json();
                        setError(getFailedResponseMessage(data));
                    } else {
                        setValue('isVerificationCodeSent', true, {
                            shouldDirty: true,
                            shouldTouch: true,
                        });
                    }
                });
            } else if (newPassword && verificationCode) {
                const result = await resetPassword({
                    email,
                    newPassword,
                    verificationCode,
                });

                if (result?.error) {
                    setError(result.error);
                }
            } else {
                setError(requiredFieldsErrorText);
            }
        } catch (error) {
            setError(getFailedResponseMessage(error));
        }

        setIsLoading(false);
    };

    return (
        <FormProvider {...methods}>
            <ResetPasswordForm
                isLoading={false}
                isDirty={formState.isDirty}
                isVerificationCodeSent={watch('isVerificationCodeSent')}
                error={error}
                submit={submit}
                handleSubmit={handleSubmit}
            />
        </FormProvider>
    );
}
