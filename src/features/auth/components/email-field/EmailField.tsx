import { useFormContext, Controller } from 'react-hook-form';

import TextField from 'components/text-field/TextField';

interface IEmailFieldProps {
    name: string;
    label: string;
    disabled?: boolean;
}

export default function EmailField({
    name,
    label,
    disabled,
}: IEmailFieldProps): JSX.Element {
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
