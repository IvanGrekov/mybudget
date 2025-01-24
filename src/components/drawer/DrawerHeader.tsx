import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/drawer/Drawer.module.scss';
import { useIsHeaderCompressed } from 'components/drawer/hooks/useIsHeaderCompressed';

interface IDrawerHeaderProps extends PropsWithChildren {
    isOpen: boolean;
}

export default function DrawerHeader({
    isOpen,
    children,
}: IDrawerHeaderProps): JSX.Element {
    const { isCompressed } = useIsHeaderCompressed();

    return (
        <div
            className={cx(styles['header'], {
                [styles['header--compressed']]: isCompressed,
                [styles['header--open']]: isOpen,
            })}
        >
            {children}
        </div>
    );
}
