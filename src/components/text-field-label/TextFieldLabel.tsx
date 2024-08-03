import { forwardRef, Ref } from 'react';

import cx from 'classnames';

import InputLabelRequiredMark from 'components/input-label-required-mark/InputLabelRequiredMark';
import styles from 'components/text-field-label/TextFieldLabel.module.scss';
import TextFieldLabelText from 'components/text-field-label-text/TextFieldLabelText';

export interface ITextFieldLabelProps {
    htmlFor: string;
    label?: string;
    isFocused: boolean;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const TextFieldLabel = (
    {
        htmlFor,
        label,
        isFocused,
        error,
        required,
        disabled,
        className,
    }: ITextFieldLabelProps,
    ref: Ref<HTMLLabelElement>,
): JSX.Element | null => {
    if (!label) {
        return null;
    }

    return (
        <label
            ref={ref}
            htmlFor={htmlFor}
            className={cx(
                styles.label,
                {
                    [styles['label--focused']]: isFocused,
                    [styles['label--error']]: error,
                },
                className,
            )}
        >
            <>
                <TextFieldLabelText text={label} variant="body2" />

                <InputLabelRequiredMark
                    required={required}
                    disabled={disabled}
                />
            </>
        </label>
    );
};

export default forwardRef(TextFieldLabel);
