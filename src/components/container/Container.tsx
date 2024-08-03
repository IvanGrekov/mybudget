import { PropsWithChildren, CSSProperties } from 'react';

import cx from 'classnames';

import styles from 'components/container/Container.module.scss';

interface IContainerProps extends PropsWithChildren {
    element?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    style?: CSSProperties;
}

export default function Container({
    element = 'div',
    size = 'xl',
    className,
    children,
    style,
}: IContainerProps): JSX.Element {
    const Element = element;

    return (
        <Element
            className={cx(styles.container, styles[size], className)}
            style={style}
        >
            {children}
        </Element>
    );
}
