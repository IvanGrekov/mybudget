import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/menu/Menu.module.scss';

interface IMenuActionsProps extends PropsWithChildren {
    isOpen: boolean;
    className?: string;
    activeClassName?: string;
}

export default function MenuActions({
    isOpen,
    children,
    className,
    activeClassName = '',
}: IMenuActionsProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.actions,
                {
                    [styles['actions--open']]: isOpen,
                    [activeClassName]: isOpen,
                },
                className,
            )}
        >
            {children}
        </div>
    );
}
