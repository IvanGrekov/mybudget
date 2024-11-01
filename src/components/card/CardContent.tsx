import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/card/Card.module.scss';

interface ICardContentProps extends PropsWithChildren {
    className?: string;
}

export default function CardContent({
    children,
    className,
}: ICardContentProps): JSX.Element {
    return (
        <div className={cx(styles['card-content'], className)}>{children}</div>
    );
}
