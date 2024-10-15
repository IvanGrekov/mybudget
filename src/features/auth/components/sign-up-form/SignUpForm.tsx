import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import ErrorMessage from 'components/error-message/ErrorMessage';
import Fieldset from 'components/fieldset/Fieldset';
import FormTextField from 'components/form-fields/FormTextField';
import TimeZoneField from 'components/time-zone-field/TimeZoneField';
import CurrencyField from 'features/auth/components/currency-field/CurrencyField';
import SignUpPageActions from 'features/auth/components/sign-up-page-actions/SignUpPageActions';
import {
    SIGN_UP_FORM_FIELD_NAMES,
    SIGN_UP_FORM_FIELD_LABELS,
} from 'features/auth/constants/signUpForm.constants';
import styles from 'features/auth/styles/AuthForm.module.scss';
import { TSignUpFormValues } from 'features/auth/types/signUpFormValues';

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
                    label={SIGN_UP_FORM_FIELD_LABELS.email}
                    required={true}
                />
                <FormTextField
                    type="password"
                    name={SIGN_UP_FORM_FIELD_NAMES.password}
                    label={SIGN_UP_FORM_FIELD_LABELS.password}
                    required={true}
                />
                <FormTextField
                    type="password"
                    name={SIGN_UP_FORM_FIELD_NAMES.confirmPassword}
                    label={SIGN_UP_FORM_FIELD_LABELS.confirmPassword}
                    required={true}
                />
                <CurrencyField
                    name={SIGN_UP_FORM_FIELD_NAMES.defaultCurrency}
                    label={SIGN_UP_FORM_FIELD_LABELS.defaultCurrency}
                />
                <TimeZoneField
                    name={SIGN_UP_FORM_FIELD_NAMES.timeZone}
                    label={SIGN_UP_FORM_FIELD_LABELS.timeZone}
                />
                <FormTextField
                    name={SIGN_UP_FORM_FIELD_NAMES.nickname}
                    label={SIGN_UP_FORM_FIELD_LABELS.nickname}
                />
            </Fieldset>
        </form>
    );
}
