'use client';

import { ReactElement, useRef, useState } from 'react';

import cx from 'classnames';

import Tab from 'components/tabs/Tab';
import styles from 'components/tabs/Tabs.module.scss';
import { useInitIndicator } from 'components/tabs/hooks/useInitIndicator';
import TabsContextProvider from 'contexts/TabsContext';

interface ITabsProps {
    children: Array<ReactElement<typeof Tab>>;
    isDelayed?: boolean;
}

export default function Tabs({ children, isDelayed }: ITabsProps): JSX.Element {
    const indicatorElementRef = useRef<HTMLDivElement | null>(null);

    const [indicatorLeftPosition, setIndicatorLeftPosition] = useState<
        null | number
    >(null);

    useInitIndicator({
        indicatorElementRef,
        isDelayed,
        setIndicatorLeftPosition,
    });

    const isIndicatorInitialized = indicatorLeftPosition !== null;

    return (
        <div className={styles.tabs}>
            <div
                ref={indicatorElementRef}
                className={cx(styles.indicator, {
                    [styles['indicator--active']]: isIndicatorInitialized,
                })}
            />

            <TabsContextProvider
                value={{
                    indicatorElement: indicatorElementRef.current,
                    initialIndicatorLeftPosition: indicatorLeftPosition || 0,
                }}
            >
                <div className={styles.list}>{children}</div>
            </TabsContextProvider>
        </div>
    );
}
