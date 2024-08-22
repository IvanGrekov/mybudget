import cx from 'classnames';

import styles from 'components/input-container/InputContainer.module.scss';
import InputError from 'components/input-error/InputError';
import { TInputContainerProps } from 'types/input.types';

export default function InputContainer({
    children,
    disabled,
    isFullWidth,
    className,
    errorClassName,
    ...rest
}: TInputContainerProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.container,
                {
                    [styles['container--disabled']]: disabled,
                    [styles['container--full-width']]: isFullWidth,
                },
                className,
            )}
        >
            {children}

            <InputError
                disabled={disabled}
                className={cx(styles.error, errorClassName)}
                {...rest}
            />
        </div>
    );
}
