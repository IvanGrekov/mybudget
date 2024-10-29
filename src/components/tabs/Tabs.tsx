'use client';

import { ReactElement, useRef } from 'react';

import cx from 'classnames';

import Tab from 'components/tabs/Tab';
import styles from 'components/tabs/Tabs.module.scss';
import { useInitIndicator } from 'components/tabs/hooks/useInitIndicator';
import TabsContextProvider from 'contexts/TabsContext';

interface ITabsProps {
    children: Array<ReactElement<typeof Tab>>;
}

export default function Tabs({ children }: ITabsProps): JSX.Element {
    const tabsElementRef = useRef<HTMLDivElement | null>(null);
    const indicatorElementRef = useRef<HTMLDivElement | null>(null);

    const indicatorLeftPosition = useInitIndicator({
        indicatorElementRef,
    });

    const isIndicatorInitialized = indicatorLeftPosition !== null;

    return (
        <div ref={tabsElementRef} className={styles.tabs}>
            <div
                ref={indicatorElementRef}
                className={cx(styles.indicator, {
                    [styles['indicator--active']]: isIndicatorInitialized,
                })}
            />

            <TabsContextProvider
                value={{
                    tabsElement: tabsElementRef.current,
                    indicatorElement: indicatorElementRef.current,
                    initialIndicatorLeftPosition: indicatorLeftPosition || 0,
                }}
            >
                <div className={styles.list}>{children}</div>
            </TabsContextProvider>
        </div>
    );
}
