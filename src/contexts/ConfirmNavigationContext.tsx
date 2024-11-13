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
    createContext<IConfirmNavigationContext | null>(null);

export function ConfirmNavigationProvider({
    children,
}: PropsWithChildren): JSX.Element {
    const [shouldConfirmNavigation, setShouldConfirmNavigation] =
        useState(false);
    const [
        shouldShowCloseModalConfirmation,
        setShouldShowCloseModalConfirmation,
    ] = useState(false);
    const [onConfirm, setOnConfirm] = useState<VoidFunction | null>(null);

    const value = useMemo(
        () => ({
            shouldConfirmNavigation,
            shouldShowCloseModalConfirmation,
            setShouldConfirmNavigation,
            setShouldShowCloseModalConfirmation,
            onConfirm,
            setOnConfirm,
        }),
        [shouldConfirmNavigation, shouldShowCloseModalConfirmation, onConfirm],
    );

    return (
        <ConfirmNavigationContext.Provider value={value}>
            {children}
        </ConfirmNavigationContext.Provider>
    );
}

export const useConfirmNavigationContext = (): IConfirmNavigationContext => {
    const context = useContext(ConfirmNavigationContext);

    if (!context) {
        throw new Error(
            'useConfirmNavigationContext must be used within a ConfirmNavigationProvider',
        );
    }

    return context;
};
