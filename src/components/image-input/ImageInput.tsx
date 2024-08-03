import cx from 'classnames';

import styles from 'components/image-input/ImageInput.module.scss';
import ImageInputDragOverlay from 'components/image-input/ImageInputDragOverlay';
import ImageInputPlaceholder from 'components/image-input/ImageInputPlaceholder';
import ImageInputPreview from 'components/image-input/ImageInputPreview';
import { INPUT_ACCEPT_ATTRIBUTE } from 'components/image-input/constants/imageInput.constants';
import { useImageInput } from 'components/image-input/hooks/imageInput.hooks';
import { TImageInputProps } from 'components/image-input/types/imageInput.types';
import InputContainer from 'components/input-container/InputContainer';

export default function ImageInput({
    name,
    error,
    required,
    disabled,
    placeholder,
    caption,
    placeholderVariant,
    containerClassName,
    errorClassName,
    labelClassName,
    placeholderClassName,
    onChange,
}: TImageInputProps): JSX.Element {
    const {
        inputRef,
        labelRef,
        isDragActive,
        imagePreview,
        onInputChange,
        onDragEnter,
        onDragOver,
        onDragLeave,
        onDrop,
        clearImage,
    } = useImageInput(onChange);

    return (
        <InputContainer
            error={error}
            disabled={disabled}
            className={cx(styles.container, containerClassName)}
            errorClassName={errorClassName}
        >
            <label
                ref={labelRef}
                tabIndex={disabled ? -1 : 0}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={cx(
                    styles.label,
                    {
                        [styles['label--error']]: error,
                        [styles['label--disabled']]: disabled,
                    },
                    labelClassName,
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept={INPUT_ACCEPT_ATTRIBUTE}
                    required={required}
                    disabled={disabled}
                    className={cx(styles.input)}
                    onChange={onInputChange}
                />

                {isDragActive && <ImageInputDragOverlay />}

                {imagePreview ? (
                    <ImageInputPreview
                        imagePreview={imagePreview}
                        clearImage={clearImage}
                    />
                ) : (
                    <ImageInputPlaceholder
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                        caption={caption}
                        placeholderVariant={placeholderVariant}
                        placeholderClassName={placeholderClassName}
                    />
                )}
            </label>
        </InputContainer>
    );
}
