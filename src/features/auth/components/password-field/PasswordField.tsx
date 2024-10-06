import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';
import { SIGN_IN_FORM_FIELD_NAMES } from 'features/auth/constants/signInForm.constants';

export default function PasswordField(): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={SIGN_IN_FORM_FIELD_NAMES.password}
            control={control}
            render={({ field }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        label={SIGN_IN_FORM_FIELD_NAMES.password}
                        isFullWidth={true}
                        type="password"
                        nativeSelectRefCallback={ref}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
