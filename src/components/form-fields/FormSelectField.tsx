import { useFormContext, Controller } from 'react-hook-form';

import Select from 'components/select/Select';
import { TSelectProps } from 'components/select/types/select.types';

type TFormSelectFieldProps<T> = Pick<
    TSelectProps<T>,
    | 'label'
    | 'options'
    | 'shouldAddSearch'
    | 'isClearable'
    | 'required'
    | 'getOptionLabel'
    | 'getOptionReactNode'
    | 'getIsOptionSelected'
> & {
    name: string;
};

export default function FormSelectField<T>({
    name,
    label,
    options,
    shouldAddSearch,
    isClearable,
    required,
    getOptionLabel,
    getOptionReactNode,
    getIsOptionSelected,
}: TFormSelectFieldProps<T>): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, ...fieldProps } = field;

                return (
                    <Select
                        label={label}
                        options={options}
                        shouldAddSearch={shouldAddSearch}
                        isClearable={isClearable}
                        required={required}
                        isFullWidth={true}
                        getOptionLabel={getOptionLabel}
                        getOptionReactNode={getOptionReactNode}
                        getIsOptionSelected={getIsOptionSelected}
                        nativeSelectRefCallback={ref}
                        error={fieldState.error?.message}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
