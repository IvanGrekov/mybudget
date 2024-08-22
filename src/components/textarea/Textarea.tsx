import cx from 'classnames';

import InputContainer from 'components/input-container/InputContainer';
import TextFieldLabel from 'components/text-field-label/TextFieldLabel';
import TextFieldPlaceholder from 'components/text-field-placeholder/TextFieldPlaceholder';
import TextFieldWrapper from 'components/text-field-wrapper/TextFieldWrapper';
import styles from 'components/textarea/Textarea.module.scss';
import { useTextarea } from 'components/textarea/hooks/useTextarea';
import { TTextareaProps } from 'components/textarea/types/textArea.types';

export default function Textarea({
    error,
    required,
    disabled,
    label,
    placeholder = label || 'Enter value',
    shouldHidePlaceholder,
    rows = 5,
    disableResize,
    isFullWidth,
    containerClassName,
    labelClassName,
    placeholderClassName,
    errorClassName,
    textFieldWrapperClassName,
    className,
    onFocus,
    onBlur,
    onChange,
    onClick,
    ...rest
}: TTextareaProps): JSX.Element {
    const {
        textareaRef,
        id,
        isTextareaFilled,
        isFocused,
        onTextareaFocus,
        onTextareaBlur,
        onTextareaClick,
        onTextareaChange,
    } = useTextarea({
        onFocus,
        onBlur,
        onClick,
        onChange,
    });

    return (
        <InputContainer
            error={error}
            disabled={disabled}
            className={containerClassName}
            errorClassName={errorClassName}
        >
            <TextFieldWrapper
                disabled={disabled}
                className={textFieldWrapperClassName}
            >
                <textarea
                    ref={textareaRef}
                    id={id}
                    disabled={disabled}
                    autoComplete="off"
                    rows={rows}
                    {...rest}
                    className={cx(
                        styles.textarea,
                        {
                            [styles['textarea--disabled']]: disabled,
                            [styles['textarea--error']]: error,
                            [styles['textarea--filled']]: isTextareaFilled,
                            [styles['textarea--not-resizing']]: disableResize,
                            [styles['textarea--full-width']]: isFullWidth,
                        },
                        className,
                    )}
                    onFocus={onTextareaFocus}
                    onBlur={onTextareaBlur}
                    onClick={onTextareaClick}
                    onChange={onTextareaChange}
                />

                <TextFieldLabel
                    htmlFor={id}
                    label={label}
                    required={required}
                    disabled={disabled}
                    isFocused={isFocused}
                    error={error}
                    className={cx(
                        styles.label,
                        {
                            [styles['label--focused']]: isFocused,
                        },
                        labelClassName,
                    )}
                />

                {!shouldHidePlaceholder && (
                    <TextFieldPlaceholder
                        htmlFor={id}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        isFieldFilled={isTextareaFilled}
                        error={error}
                        className={cx(styles.placeholder, placeholderClassName)}
                    />
                )}
            </TextFieldWrapper>
        </InputContainer>
    );
}
