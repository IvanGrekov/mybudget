import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/button-group/ButtonGroup.module.scss';

interface IButtonGroupProps extends PropsWithChildren {
    className?: string;
}

export default function ButtonGroup({
    children,
    className,
}: IButtonGroupProps): JSX.Element {
    return <div className={cx(styles.container, className)}>{children}</div>;
}
