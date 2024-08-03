'use client';

import {
    createContext,
    useState,
    useMemo,
    useContext,
    PropsWithChildren,
} from 'react';

import { IConfirmNavigationContext } from 'types/confirmNavigationContextValue';

export const ConfirmNavigationContext =
    createContext<IConfirmNavigationContext>({
        shouldConfirmNavigation: false,
        setShouldConfirmNavigation: () => {},
    });

export function ConfirmNavigationProvider({
    children,
}: PropsWithChildren): JSX.Element {
    const [shouldConfirmNavigation, setShouldConfirmNavigation] =
        useState(false);

    const value = useMemo(
        () => ({
            shouldConfirmNavigation,
            setShouldConfirmNavigation,
        }),
        [shouldConfirmNavigation],
    );

    return (
        <ConfirmNavigationContext.Provider value={value}>
            {children}
        </ConfirmNavigationContext.Provider>
    );
}

export const useConfirmNavigationContext = (): IConfirmNavigationContext => {
    return useContext(ConfirmNavigationContext);
};
