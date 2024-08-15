'use client';

import { PropsWithChildren } from 'react';

import cx from 'classnames';

import styles from 'components/header/Header.module.scss';
import { useShouldShowPreferencesSwitchers } from 'components/header/hooks/useShouldShowPreferencesSwitchers';
import OpenMobileSidebarButton from 'components/open-mobile-sidebar-button/OpenMobileSidebarButton';
import PageLoadingIndicator from 'components/page-loading-indicator/PageLoadingIndicator';
import PreferencesSwitchers from 'components/preferences-switchers/PreferencesSwitchers';
import Show from 'components/show/Show';
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
    const shouldShowPreferencesSwitchers = useShouldShowPreferencesSwitchers();

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
                    <Show when={shouldShowPreferencesSwitchers}>
                        <PreferencesSwitchers tooltipPosition="bottom-left" />
                    </Show>

                    {children}
                </div>
            </div>
        </header>
    );
}
