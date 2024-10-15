import { Controller, useFormContext } from 'react-hook-form';

import TextField from 'components/text-field/TextField';
import { TTextFieldProps } from 'components/text-field/types/textField.types';

type TFormTextFieldProps = Pick<
    TTextFieldProps,
    'label' | 'type' | 'disabled' | 'required' | 'maxLength'
> & {
    name: string;
};

export default function FormTextField({
    name,
    label,
    type,
    disabled,
    required,
    maxLength,
}: TFormTextFieldProps): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <TextField
                        label={label}
                        isFullWidth={true}
                        type={type}
                        disabled={disabled}
                        required={required}
                        maxLength={maxLength}
                        nativeSelectRefCallback={ref}
                        error={fieldState.error?.message}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
