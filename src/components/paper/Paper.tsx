import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/paper/Paper.module.scss';

interface IPaperProps extends PropsWithChildren {
    element?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header';
    className?: string;
}

export default function Paper({
    element = 'div',
    children,
    className,
}: IPaperProps): JSX.Element {
    const Element = element;

    return (
        <Element className={cx(styles.paper, className)}>{children}</Element>
    );
}
