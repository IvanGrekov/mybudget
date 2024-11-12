import { PropsWithChildren, Ref, forwardRef } from 'react';

import cx from 'classnames';

import styles from 'components/card/Card.module.scss';

interface ICardProps extends PropsWithChildren {
    className?: string;
}

function Card(
    { className, children }: ICardProps,
    ref: Ref<HTMLDivElement>,
): JSX.Element {
    return (
        <article ref={ref} className={cx(styles.card, className)}>
            {children}
        </article>
    );
}

export default forwardRef(Card);
