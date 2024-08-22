import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import InputLabelRequiredMark from 'components/input-label-required-mark/InputLabelRequiredMark';
import TextFieldLabelText, {
    ITextFieldLabelTextProps,
} from 'components/text-field-label-text/TextFieldLabelText';
import styles from 'components/text-field-placeholder/TextFieldPlaceholder.module.scss';

export type TTextFieldPlaceholderProps = Pick<
    ITextFieldLabelTextProps,
    'variant'
> & {
    htmlFor: string;
    placeholder?: string;
    isFieldFilled: boolean;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    isFullWidth?: boolean;
    className?: string;
};

const TextFieldPlaceholder = (
    {
        htmlFor,
        placeholder,
        isFieldFilled,
        error,
        required,
        disabled,
        variant,
        isFullWidth,
        className,
    }: TTextFieldPlaceholderProps,
    ref: Ref<HTMLLabelElement>,
): JSX.Element | null => {
    if (!placeholder || isFieldFilled) {
        return null;
    }

    return (
        <label
            ref={ref}
            htmlFor={htmlFor}
            className={cx(
                styles.placeholder,
                {
                    [styles['placeholder--error']]: error,
                    [styles['placeholder--disabled']]: disabled,
                    [styles['placeholder--full-width']]: isFullWidth,
                },
                className,
            )}
        >
            <>
                <TextFieldLabelText text={placeholder} variant={variant} />

                <InputLabelRequiredMark
                    required={required}
                    disabled={disabled}
                />
            </>
        </label>
    );
};

export default forwardRef(TextFieldPlaceholder);
