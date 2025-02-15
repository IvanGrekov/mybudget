import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import TimeZoneField from 'components/time-zone-field/TimeZoneField';
import CurrencyField from 'features/auth/components/currency-field/CurrencyField';
import SignUpPageActions from 'features/auth/components/sign-up-page-actions/SignUpPageActions';
import { SIGN_UP_FORM_FIELD_NAMES } from 'features/auth/constants/signUpForm.constants';
import styles from 'features/auth/styles/AuthForm.module.scss';
import { TSignUpFormValues } from 'features/auth/types/signUpFormValues';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

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
    const [
        emailFieldLabel,
        passwordFieldLabel,
        confirmPasswordFieldLabel,
        nicknameFieldLabel,
        defaultCurrencyFieldLabel,
        timeZoneFieldLabel,
    ] = useGetFeatureTranslations({
        featureName: 'SignUp',
        keys: [
            'email',
            'password',
            'confirm_password',
            'nickname',
            'default_currency',
            'time_zone',
        ],
    });

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
                <FormTextField
                    type="email"
                    name={SIGN_UP_FORM_FIELD_NAMES.email}
                    label={emailFieldLabel}
                    required={true}
                />
                <FormTextField
                    type="password"
                    name={SIGN_UP_FORM_FIELD_NAMES.password}
                    label={passwordFieldLabel}
                    required={true}
                />
                <FormTextField
                    type="password"
                    name={SIGN_UP_FORM_FIELD_NAMES.confirmPassword}
                    label={confirmPasswordFieldLabel}
                    required={true}
                />
                <CurrencyField
                    name={SIGN_UP_FORM_FIELD_NAMES.defaultCurrency}
                    label={defaultCurrencyFieldLabel}
                />
                <TimeZoneField
                    name={SIGN_UP_FORM_FIELD_NAMES.timeZone}
                    label={timeZoneFieldLabel}
                />
                <FormTextField
                    name={SIGN_UP_FORM_FIELD_NAMES.nickname}
                    label={nicknameFieldLabel}
                />
            </Fieldset>
        </form>
    );
}
