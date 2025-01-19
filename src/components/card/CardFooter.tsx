import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/card/Card.module.scss';

interface ICardFooterProps extends PropsWithChildren {
    className?: string;
    shouldHideBorder?: boolean;
}

export default function CardFooter({
    children,
    className,
    shouldHideBorder,
}: ICardFooterProps): JSX.Element {
    return (
        <footer
            className={cx(styles['card-footer'], className, {
                [styles['card-footer--hide-border']]: shouldHideBorder,
            })}
        >
            {children}
        </footer>
    );
}
