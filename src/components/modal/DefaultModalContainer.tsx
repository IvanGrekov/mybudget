import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/modal/Modal.module.scss';

interface IDefaultModalContainerProps extends PropsWithChildren {
    className?: string;
}

export default function DefaultModalContainer({
    children,
    className,
}: IDefaultModalContainerProps): JSX.Element {
    return <div className={cx(styles.container, className)}>{children}</div>;
}
