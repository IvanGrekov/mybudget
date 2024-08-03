'use client';

import {
    createContext,
    useState,
    useMemo,
    useContext,
    PropsWithChildren,
} from 'react';

import { TMobileSidebarContextValue } from 'types/mobileSidebarContextValue';

const MobileSidebarContext = createContext<TMobileSidebarContextValue | null>(
    null,
);

export function MobileSidebarProvider({
    children,
}: PropsWithChildren): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const value = useMemo(
        () => ({
            isOpen,
            setIsOpen,
        }),
        [isOpen],
    );

    return (
        <MobileSidebarContext.Provider value={value}>
            {children}
        </MobileSidebarContext.Provider>
    );
}

export const useMobileSidebarContext = (): TMobileSidebarContextValue => {
    const context = useContext(MobileSidebarContext);

    if (!context) {
        throw new Error(
            'useMobileSidebarContext must be used within a MobileSidebarProvider',
        );
    }

    return context;
};
