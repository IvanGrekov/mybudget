import { MouseEventHandler } from 'react';

import cx from 'classnames';
import Image from 'next/image';

import IconButton from 'components/button/IconButton';
import CloseIcon from 'components/icons/CloseIcon';
import styles from 'components/image-input/ImageInput.module.scss';
import { IMAGE_INPUT_SIZE } from 'components/image-input/constants/imageInput.constants';

interface IImageInputPreviewProps {
    imagePreview: string;
    name?: string;
    disabled?: boolean;
    clearImage: VoidFunction;
}

export default function ImageInputPreview({
    imagePreview,
    name = 'image preview',
    disabled,
    clearImage,
}: IImageInputPreviewProps): JSX.Element {
    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        clearImage();
    };

    return (
        <div className={cx(styles['image-wrapper'])}>
            <Image
                src={imagePreview}
                alt={name}
                className={cx(styles.image, {
                    [styles['image--disabled']]: disabled,
                })}
                width={IMAGE_INPUT_SIZE}
                height={IMAGE_INPUT_SIZE}
            />

            {!disabled && (
                <IconButton
                    Icon={CloseIcon}
                    variant="overlayed"
                    iconSize={30}
                    className={styles['remove-image-button']}
                    onClick={onClick}
                />
            )}
        </div>
    );
}
