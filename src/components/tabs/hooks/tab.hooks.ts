import { useEffect, MutableRefObject, useRef } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { ITabProps } from 'components/tabs/types/tabProps';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import { useTabsContext } from 'contexts/TabsContext';
import { useGetStringifiedSearchParams } from 'hooks/searchParams.hooks';

type TTabElementRef = MutableRefObject<HTMLDivElement | null>;

type TUseTabIndicatorConnectionProps = Pick<
    ITabProps,
    'value' | 'customCurrentTab'
> & {
    tabElementRef: TTabElementRef;
    currentTab: string;
};

type TUseTabIndicatorConnection = (
    props: TUseTabIndicatorConnectionProps,
) => void;

export const useTabIndicatorConnection: TUseTabIndicatorConnection = ({
    tabElementRef,
    value,
    currentTab,
    customCurrentTab,
}) => {
    const isConnected = useRef(false);

    const { tabsElement, indicatorElement, initialIndicatorLeftPosition } =
        useTabsContext();

    const activeTab = customCurrentTab ?? currentTab;

    useEffect(() => {
        const tabElementRect = tabElementRef.current?.getBoundingClientRect();

        if (
            !indicatorElement ||
            !initialIndicatorLeftPosition ||
            !tabElementRect
        ) {
            return;
        }

        if (value === activeTab) {
            const newLeftPosition =
                tabElementRect.left -
                initialIndicatorLeftPosition +
                (tabsElement?.scrollLeft || 0);

            !isConnected.current &&
                tabsElement?.scrollTo({
                    left: newLeftPosition,
                    behavior: 'smooth',
                });
            indicatorElement.style.left = `${newLeftPosition}px`;
        }

        isConnected.current = true;
    }, [
        tabElementRef,
        tabsElement,
        indicatorElement,
        initialIndicatorLeftPosition,
        value,
        activeTab,
    ]);
};

type TUseTabClickListener = (path: ITabProps['value']) => VoidFunction;

export const useTabClickListener: TUseTabClickListener = (path) => {
    const router = useRouter();
    const pathname = usePathname();
    const getStringifiedSearchParams = useGetStringifiedSearchParams();

    return () => {
        const params = getStringifiedSearchParams(TAB_PARAM_NAME, path);
        router.push(`${pathname}${params}`);
    };
};
