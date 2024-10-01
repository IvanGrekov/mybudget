'use client';

import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ConfirmNavigationProvider } from 'contexts/ConfirmNavigationContext';
import { MobileSidebarProvider } from 'contexts/MobileSidebarContext';
import { NotificationsProvider } from 'contexts/NotificationsContext';
import { PageLoadingProvider } from 'contexts/PageLoadingContext';
import { getQueryClient } from 'utils/getQueryClient';

export default function Providers({
    children,
}: PropsWithChildren): JSX.Element {
    return (
        <PageLoadingProvider>
            <QueryClientProvider client={getQueryClient()}>
                <ReactQueryDevtools />
                <ConfirmNavigationProvider>
                    <MobileSidebarProvider>
                        <NotificationsProvider>
                            {children}
                        </NotificationsProvider>
                    </MobileSidebarProvider>
                </ConfirmNavigationProvider>
            </QueryClientProvider>
        </PageLoadingProvider>
    );
}
