'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { signIn } from 'actions/signIn';
import { usePageLoading } from 'contexts/PageLoadingContext';
import { SIGN_IN_FORM_VALIDATION } from 'features/auth/components/sign-in/constants/signInFormValidation';
import SignInForm from 'features/auth/components/sign-in-form/SignInForm';
import { ISignInFormValues } from 'features/auth/types/signInFormValues';

export default function SignIn(): JSX.Element {
    const { setIsLoading } = usePageLoading();
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<ISignInFormValues>({
        defaultValues: {
            email: '',
            password: '',
            tfaToken: '',
            isVerificationRequired: false,
        },
        resolver: SIGN_IN_FORM_VALIDATION,
    });

    const { formState, setValue, handleSubmit, watch } = methods;

    const handler = async ({
        email,
        password,
        tfaToken,
    }: ISignInFormValues): Promise<void> => {
        setError(null);
        setIsLoading(true);

        const result = await signIn({ email, password, tfaToken }).finally(() =>
            setIsLoading(false),
        );

        if (!result) {
            return;
        }

        if ('shouldPassTfa' in result) {
            setValue('isVerificationRequired', true);
        }

        if ('error' in result) {
            setError(result.error);
        }
    };

    return (
        <FormProvider {...methods}>
            <SignInForm
                isLoading={false}
                isDirty={formState.isDirty}
                shouldShowVerificationCode={watch('isVerificationRequired')}
                error={error}
                signIn={handler}
                handleSubmit={handleSubmit}
            />
        </FormProvider>
    );
}
