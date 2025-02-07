'use client';

import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import BurgerIcon from 'components/icons/BurgerIcon';
import styles from 'components/open-mobile-sidebar-button/OpenMobileSidebarButton.module.scss';
import { useOpenMobileSidebarButton } from 'components/open-mobile-sidebar-button/hooks/useOpenMobileSidebarButton';

interface IOpenMobileSidebarButtonProps {
    className?: string;
}

export default function OpenMobileSidebarButton({
    className,
}: IOpenMobileSidebarButtonProps): JSX.Element | null {
    const { isVisible, onClick } = useOpenMobileSidebarButton();

    if (!isVisible) {
        return null;
    }

    return (
        <IconButton
            title="Open sidebar"
            Icon={BurgerIcon}
            className={cx(styles.button, className)}
            onClick={onClick}
        />
    );
}
