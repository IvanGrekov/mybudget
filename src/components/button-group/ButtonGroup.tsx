import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/button-group/ButtonGroup.module.scss';

interface IButtonGroupProps extends PropsWithChildren {
    isReverse?: boolean;
    className?: string;
}

export default function ButtonGroup({
    children,
    isReverse,
    className,
}: IButtonGroupProps): JSX.Element {
    return (
        <div
            className={cx(styles.container, className, {
                [styles['container--reverse']]: isReverse,
            })}
        >
            {children}
        </div>
    );
}
