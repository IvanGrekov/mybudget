import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';
import {
    SIGN_IN_FORM_FIELD_NAMES,
    TFA_TOKEN_LABEL,
} from 'features/auth/constants/signInForm.constants';

export default function VerificationField(): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={SIGN_IN_FORM_FIELD_NAMES.tfaToken}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        label={TFA_TOKEN_LABEL}
                        isFullWidth={true}
                        type="number"
                        maxLength={6}
                        error={fieldState.error?.message}
                        nativeSelectRefCallback={ref}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
