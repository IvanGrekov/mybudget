'use client';

import { PropsWithChildren } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NavigationGuardProvider } from 'next-navigation-guard';

import AuthProvider from 'components/auth-provider/AuthProvider';
import QueryClientProvider from 'components/query-client-provider/QueryClientProvider';
import { ConfirmNavigationProvider } from 'contexts/ConfirmNavigationContext';
import { ExchangeRatesProvider } from 'contexts/ExchangeRatesContext';
import { MobileSidebarProvider } from 'contexts/MobileSidebarContext';
import { NotificationsProvider } from 'contexts/NotificationsContext';
import { PageLoadingProvider } from 'contexts/PageLoadingContext';
import { TExchangeRates } from 'types/exchangeRates';

interface IProvidersProps extends PropsWithChildren {
    exchangeRates: TExchangeRates;
}

export default function Providers({
    exchangeRates,
    children,
}: IProvidersProps): JSX.Element {
    return (
        <PageLoadingProvider>
            <NotificationsProvider>
                <QueryClientProvider>
                    <ReactQueryDevtools />
                    <ConfirmNavigationProvider>
                        <NavigationGuardProvider>
                            <MobileSidebarProvider>
                                <ExchangeRatesProvider
                                    exchangeRates={exchangeRates}
                                >
                                    <AuthProvider>{children}</AuthProvider>
                                </ExchangeRatesProvider>
                            </MobileSidebarProvider>
                        </NavigationGuardProvider>
                    </ConfirmNavigationProvider>
                </QueryClientProvider>
            </NotificationsProvider>
        </PageLoadingProvider>
    );
}
