import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/card/Card.module.scss';

interface ICardProps extends PropsWithChildren {
    className?: string;
}

export default function Card({ className, children }: ICardProps): JSX.Element {
    return <article className={cx(styles.card, className)}>{children}</article>;
}
