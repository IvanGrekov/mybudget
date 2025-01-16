import { Controller, useFormContext } from 'react-hook-form';

import Textarea from 'components/textarea/Textarea';
import { TTextareaProps } from 'components/textarea/types/textArea.types';

type TFormTextAreaProps = Pick<
    TTextareaProps,
    | 'label'
    | 'placeholder'
    | 'shouldHidePlaceholder'
    | 'disableResize'
    | 'disabled'
    | 'required'
    | 'maxLength'
    | 'rows'
> & {
    name: string;
    formatValue?: (value: number) => number;
};

export default function FormTextArea({
    name,
    label,
    placeholder,
    shouldHidePlaceholder,
    disableResize,
    disabled,
    required,
    maxLength,
    rows,
    formatValue,
}: TFormTextAreaProps): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { ref, value, ...fieldProps } = field;

                return (
                    <Textarea
                        label={label}
                        placeholder={placeholder}
                        shouldHidePlaceholder={shouldHidePlaceholder}
                        isFullWidth={true}
                        disabled={disabled}
                        required={required}
                        rows={rows}
                        disableResize={disableResize}
                        maxLength={maxLength}
                        nativeSelectRefCallback={ref}
                        error={fieldState.error?.message}
                        value={formatValue ? formatValue(value) : value}
                        {...fieldProps}
                    />
                );
            }}
        />
    );
}
