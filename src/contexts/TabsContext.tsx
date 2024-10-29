'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

interface ITabsContextValue {
    indicatorElement: HTMLDivElement | null;
    initialIndicatorLeftPosition: number;
}

const TabsContext = createContext<ITabsContextValue | null>(null);

interface ITabsContextProviderProps extends PropsWithChildren {
    value: ITabsContextValue;
}

export default function TabsContextProvider({
    children,
    value,
}: ITabsContextProviderProps): JSX.Element {
    return (
        <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
    );
}

export const useTabsContext = (): ITabsContextValue => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error(
            'useTabsContext must be used within a TabsContextProvider',
        );
    }

    return context;
};
