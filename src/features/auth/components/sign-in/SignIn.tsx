'use client';

import { useForm, FormProvider } from 'react-hook-form';

import SignInForm from 'features/auth/components/sign-in-form/SignInForm';
import { SignInDto } from 'types/generated.types';

export default function SignIn(): JSX.Element {
    const methods = useForm<SignInDto>();

    const { formState, handleSubmit } = methods;

    const signIn = (data: SignInDto): void => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <SignInForm
                isLoading={false}
                isDirty={formState.isDirty}
                signIn={signIn}
                handleSubmit={handleSubmit}
            />
        </FormProvider>
    );
}
