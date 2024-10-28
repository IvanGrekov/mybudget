'use client';

import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AuthProvider from 'components/auth-provider/AuthProvider';
import { ConfirmNavigationProvider } from 'contexts/ConfirmNavigationContext';
import { ExchangeRatesProvider } from 'contexts/ExchangeRatesContext';
import { MobileSidebarProvider } from 'contexts/MobileSidebarContext';
import { NotificationsProvider } from 'contexts/NotificationsContext';
import { PageLoadingProvider } from 'contexts/PageLoadingContext';
import { TExchangeRates } from 'types/exchangeRates';
import { getQueryClient } from 'utils/getQueryClient';

interface IProvidersProps extends PropsWithChildren {
    exchangeRates: TExchangeRates;
}

export default function Providers({
    exchangeRates,
    children,
}: IProvidersProps): JSX.Element {
    return (
        <PageLoadingProvider>
            <QueryClientProvider client={getQueryClient()}>
                <ReactQueryDevtools />
                <ConfirmNavigationProvider>
                    <MobileSidebarProvider>
                        <NotificationsProvider>
                            <ExchangeRatesProvider
                                exchangeRates={exchangeRates}
                            >
                                <AuthProvider>{children}</AuthProvider>
                            </ExchangeRatesProvider>
                        </NotificationsProvider>
                    </MobileSidebarProvider>
                </ConfirmNavigationProvider>
            </QueryClientProvider>
        </PageLoadingProvider>
    );
}
