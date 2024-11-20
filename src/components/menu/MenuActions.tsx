import { PropsWithChildren, Ref, forwardRef } from 'react';

import cx from 'classnames';

import styles from 'components/menu/Menu.module.scss';

interface IMenuActionsProps extends PropsWithChildren {
    isOpen: boolean;
    className?: string;
    activeClassName?: string;
}

function MenuActions(
    { isOpen, children, className, activeClassName = '' }: IMenuActionsProps,
    ref: Ref<HTMLDivElement>,
): JSX.Element {
    return (
        <div
            ref={ref}
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

export default forwardRef(MenuActions);
