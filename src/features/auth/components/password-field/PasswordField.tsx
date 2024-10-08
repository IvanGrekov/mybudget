import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';
import { SIGN_IN_FORM_FIELD_NAMES } from 'features/auth/constants/signInForm.constants';

interface IPasswordFieldProps {
    disabled?: boolean;
}

export default function PasswordField({
    disabled,
}: IPasswordFieldProps): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={SIGN_IN_FORM_FIELD_NAMES.password}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        label={SIGN_IN_FORM_FIELD_NAMES.password}
                        isFullWidth={true}
                        type="password"
                        disabled={disabled}
                        error={fieldState.error?.message}
                        nativeSelectRefCallback={ref}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
