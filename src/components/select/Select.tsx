import cx from 'classnames';
import { FocusTrap } from 'focus-trap-react';

import InputContainer from 'components/input-container/InputContainer';
import ArrowButton from 'components/select/ArrowButton';
import ClearValueButton from 'components/select/ClearValueButton';
import CustomSelect from 'components/select/CustomSelect';
import NativeSelectOptions from 'components/select/NativeSelectOptions';
import Options from 'components/select/Options';
import styles from 'components/select/Select.module.scss';
import { useSelectField } from 'components/select/hooks/select.hooks';
import { TSelectProps } from 'components/select/types/select.types';
import TextFieldLabel from 'components/text-field-label/TextFieldLabel';
import TextFieldPlaceholder from 'components/text-field-placeholder/TextFieldPlaceholder';
import TextFieldWrapper from 'components/text-field-wrapper/TextFieldWrapper';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';

export default function Select<T>({
    name,
    value,
    options,
    error,
    required,
    disabled,
    label,
    placeholder = label || 'Select option',
    shouldHidePlaceholder,
    multiple,
    shouldCloseOnChange = multiple ? false : true,
    shouldAddSearch,
    isFullWidth,
    isClearable = true,
    containerClassName,
    labelClassName,
    placeholderClassName,
    errorClassName,
    textFieldWrapperClassName,
    arrowButtonClassName,
    clearValueButtonClassName,
    className,
    nativeSelectRefCallback,
    onFocus,
    onBlur,
    onChange,
    getOptionLabel,
    getOptionReactNode,
    getOptionValue,
    getIsOptionDisabled,
    getIsOptionHidden,
    getIsOptionSelected,
}: TSelectProps<T>): JSX.Element {
    const {
        nativeSelectRef,
        customSelectRef,
        selectOptionsRef,
        localNativeSelectValue,
        id,
        isOpen,
        isFocused,
        isOptionsFixed,
        isFieldFilled,
        onNativeSelectFocus,
        onNativeSelectBlur,
        onNativeSelectKeyDown,
        onNativeSelectChange,
        onWrapperClick,
        onWrapperBlur,
        onArrowButtonClick,
        onSelectChange,
    } = useSelectField<T>({
        value,
        options,
        multiple,
        shouldCloseOnChange,
        nativeSelectRefCallback,
        getOptionValue,
        onFocus,
        onBlur,
        onChange,
    });

    useBodyScrollLock(isOpen);

    return (
        <>
            <InputContainer
                error={error}
                disabled={disabled}
                isFullWidth={isFullWidth}
                className={containerClassName}
                errorClassName={errorClassName}
            >
                <FocusTrap
                    active={isOpen}
                    focusTrapOptions={{
                        clickOutsideDeactivates: true,
                        onDeactivate: onWrapperBlur,
                    }}
                >
                    <div
                        className={cx(styles['select-wrapper'], {
                            [styles['select-wrapper--error']]: error,
                            [styles['select-wrapper--disabled']]: disabled,
                        })}
                        onClick={onWrapperClick}
                    >
                        <TextFieldWrapper
                            disabled={disabled}
                            isFullWidth={isFullWidth}
                            className={textFieldWrapperClassName}
                        >
                            <select
                                ref={nativeSelectRef}
                                id={id}
                                value={localNativeSelectValue}
                                name={name}
                                multiple={multiple}
                                disabled={disabled}
                                className={styles['native-select']}
                                onFocus={onNativeSelectFocus}
                                onBlur={onNativeSelectBlur}
                                onKeyDown={onNativeSelectKeyDown}
                                onChange={onNativeSelectChange}
                            >
                                <NativeSelectOptions
                                    options={options}
                                    getOptionValue={getOptionValue}
                                    getOptionLabel={getOptionLabel}
                                />
                            </select>

                            <CustomSelect
                                value={value}
                                options={options}
                                customSelectRef={customSelectRef}
                                isOpen={isOpen}
                                isFocused={isFocused}
                                isFieldFilled={isFieldFilled}
                                isOptionsFixed={isOptionsFixed}
                                multiple={multiple}
                                error={error}
                                disabled={disabled}
                                isFullWidth={isFullWidth}
                                className={className}
                                getOptionLabel={getOptionLabel}
                                getOptionReactNode={getOptionReactNode}
                                onChange={onSelectChange}
                            />

                            <ArrowButton
                                error={error}
                                disabled={disabled}
                                isOpen={isOpen}
                                arrowButtonClassName={arrowButtonClassName}
                                onClick={onArrowButtonClick}
                            />

                            {isFieldFilled && !disabled && isClearable && (
                                <ClearValueButton
                                    onChange={onChange}
                                    clearValueButtonClassName={
                                        clearValueButtonClassName
                                    }
                                />
                            )}

                            <TextFieldLabel
                                htmlFor={id}
                                label={label}
                                required={required}
                                disabled={disabled}
                                isFocused={isFocused}
                                error={error}
                                isFullWidth={isFullWidth}
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
                                    isFieldFilled={isFieldFilled}
                                    error={error}
                                    isFullWidth={isFullWidth}
                                    className={cx(
                                        styles.placeholder,
                                        placeholderClassName,
                                    )}
                                />
                            )}
                        </TextFieldWrapper>

                        <Options
                            selectOptionsRef={selectOptionsRef}
                            isOpen={isOpen}
                            value={value}
                            options={options}
                            error={error}
                            multiple={multiple}
                            isOptionsFixed={isOptionsFixed}
                            shouldAddSearch={shouldAddSearch}
                            isFullWidth={isFullWidth}
                            onChange={onSelectChange}
                            getOptionLabel={getOptionLabel}
                            getOptionReactNode={getOptionReactNode}
                            getOptionValue={getOptionValue}
                            getIsOptionDisabled={getIsOptionDisabled}
                            getIsOptionHidden={getIsOptionHidden}
                            getIsOptionSelected={getIsOptionSelected}
                        />
                    </div>
                </FocusTrap>
            </InputContainer>
        </>
    );
}
