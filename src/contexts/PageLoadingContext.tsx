'use client';

import React, {
    createContext,
    useState,
    useContext,
    PropsWithChildren,
} from 'react';

interface IPageLoadingContextValues {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

const PageLoadingContext = createContext<IPageLoadingContextValues | null>(
    null,
);

export function PageLoadingProvider({
    children,
}: PropsWithChildren): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <PageLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </PageLoadingContext.Provider>
    );
}

export const usePageLoading = (): IPageLoadingContextValues => {
    const context = useContext(PageLoadingContext);

    if (!context) {
        throw new Error(
            'usePageLoading must be used within a PageLoadingProvider',
        );
    }

    return context;
};
