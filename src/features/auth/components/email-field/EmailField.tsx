import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';
import { SIGN_IN_FORM_FIELD_NAMES } from 'features/auth/constants/signInForm.constants';

interface IEmailFieldProps {
    disabled?: boolean;
}

export default function EmailField({
    disabled,
}: IEmailFieldProps): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={SIGN_IN_FORM_FIELD_NAMES.email}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        label={SIGN_IN_FORM_FIELD_NAMES.email}
                        isFullWidth={true}
                        type="email"
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
