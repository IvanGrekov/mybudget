'use client';

import { ConfirmNavigationProvider } from 'contexts/ConfirmNavigationContext';
import { MobileSidebarProvider } from 'contexts/MobileSidebarContext';
import { NotificationsProvider } from 'contexts/NotificationsContext';
import { PageLoadingProvider } from 'contexts/PageLoadingContext';

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <PageLoadingProvider>
            <ConfirmNavigationProvider>
                <MobileSidebarProvider>
                    <NotificationsProvider>{children}</NotificationsProvider>
                </MobileSidebarProvider>
            </ConfirmNavigationProvider>
        </PageLoadingProvider>
    );
}
