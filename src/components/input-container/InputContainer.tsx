import cx from 'classnames';

import styles from 'components/input-container/InputContainer.module.scss';
import InputError from 'components/input-error/InputError';
import { TInputContainerProps } from 'types/input.types';

export default function InputContainer({
    children,
    className,
    errorClassName,
    disabled,
    ...rest
}: TInputContainerProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.container,
                {
                    [styles['container--disabled']]: disabled,
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
