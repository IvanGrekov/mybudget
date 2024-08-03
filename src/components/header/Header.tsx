'use client';

import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/header/Header.module.scss';
import { useShouldShowThemeSwitcher } from 'components/header/hooks/useShouldShowThemeSwitcher';
import OpenMobileSidebarButton from 'components/open-mobile-sidebar-button/OpenMobileSidebarButton';
import PageLoadingIndicator from 'components/page-loading-indicator/PageLoadingIndicator';
import ThemeSwitcher from 'components/theme-switcher/ThemeSwitcher';
import { useIsHeaderFixed } from 'hooks/useIsHeaderFixed';

interface IHeaderProps extends PropsWithChildren {
    className?: string;
    isSidebarLayout?: boolean;
}

export default function Header({
    className,
    isSidebarLayout,
    children,
}: IHeaderProps): JSX.Element {
    const { isFixed } = useIsHeaderFixed();
    const shouldShowThemeSwitcher = useShouldShowThemeSwitcher();

    return (
        <header
            className={cx(
                styles.header,
                {
                    [styles['header--fixed']]: isFixed,
                    [styles['sidebar-layout']]: isSidebarLayout,
                },
                className,
            )}
        >
            <PageLoadingIndicator wrapperClassName={styles.loading} />

            <div className={styles['content-wrapper']}>
                <OpenMobileSidebarButton />

                <div className={styles.content}>
                    {shouldShowThemeSwitcher && (
                        <ThemeSwitcher tooltipPosition="left" />
                    )}

                    {children}
                </div>
            </div>
        </header>
    );
}
