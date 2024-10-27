import { Controller, useFormContext } from 'react-hook-form';

import Checkbox from 'components/checkbox/Checkbox';
import { TCheckboxProps } from 'components/checkbox/types/checkbox.types';

type TFormCheckboxFieldProps = Pick<
    TCheckboxProps,
    'label' | 'type' | 'disabled' | 'required' | 'maxLength'
> & {
    name: string;
};

export default function FormCheckboxField({
    name,
    label,
    type,
    disabled,
    required,
    maxLength,
}: TFormCheckboxFieldProps): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { value, ref, ...fieldProps } = field;

                return (
                    <Checkbox
                        value={value}
                        checked={value}
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
