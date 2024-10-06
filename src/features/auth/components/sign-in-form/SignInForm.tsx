import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import Button from 'components/button/Button';
import Fieldset from 'components/fieldset/Fieldset';
import EmailField from 'features/auth/components/email-field/EmailField';
import PasswordField from 'features/auth/components/password-field/PasswordField';
import { SignInDto } from 'types/generated.types';

interface ISignInFormProps {
    isLoading: boolean;
    isDirty: boolean;
    signIn: (data: SignInDto) => void;
    handleSubmit: UseFormHandleSubmit<SignInDto, undefined>;
}

export default function SignInForm({
    isLoading,
    isDirty,
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
                    <Button
                        text="Sign In"
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={!isDirty}
                    />
                }
            >
                <EmailField />
                <PasswordField />
            </Fieldset>
        </form>
    );
}
