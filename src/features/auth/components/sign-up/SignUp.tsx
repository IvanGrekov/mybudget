'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { usePageLoading } from 'contexts/PageLoadingContext';
import { SIGN_UP_FORM_VALIDATION } from 'features/auth/components/sign-up/constants/signUpFormValidation';
import { USER_TIME_ZONE } from 'features/auth/components/sign-up/constants/userTimeZone';
import SignUpForm from 'features/auth/components/sign-up-form/SignUpForm';
import { TSignUpFormValues } from 'features/auth/types/signUpFormValues';
import { CreateUserDtoDefaultCurrencyEnum } from 'types/generated.types';

export default function SignUp(): JSX.Element {
    const { setIsLoading } = usePageLoading();
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<TSignUpFormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            defaultCurrency: CreateUserDtoDefaultCurrencyEnum.USD,
            timeZone: USER_TIME_ZONE,
        },
        resolver: SIGN_UP_FORM_VALIDATION,
    });

    const { formState, handleSubmit } = methods;

    const handler = async (formValues: TSignUpFormValues): Promise<void> => {
        setError(null);
        setIsLoading(true);

        formValues;

        // const result = await signIn({ email, password, tfaToken }).finally(() =>
        //     setIsLoading(false),
        // );

        // if (result?.shouldPassTfa) {
        //     setValue('isVerificationRequired', true);
        // }

        // if (result?.error) {
        //     setError(result.error);
        // }
    };

    return (
        <FormProvider {...methods}>
            <SignUpForm
                isLoading={false}
                isDirty={formState.isDirty}
                error={error}
                signUp={handler}
                handleSubmit={handleSubmit}
            />
        </FormProvider>
    );
}
