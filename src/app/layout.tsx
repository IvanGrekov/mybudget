import { PropsWithChildren } from 'react';

import cx from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'styles/globals.scss';

import styles from 'app/layout.module.scss';
import Providers from 'app/providers';
import ErrorBoundary from 'components/error-boundary/ErrorBoundary';
import Header from 'components/header/Header';
import NavigationList from 'components/navigation-list/NavigationList';
import NetworkStatusIndicator from 'components/network-status-indicator/NetworkStatusIndicator';
import Notifications from 'components/notifications/Notifications';
import ScrollTopButton from 'components/scroll-top-button/ScrollTopButton';
import Sidebar from 'components/sidebar/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: PropsWithChildren): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ErrorBoundary>
                    <Providers>
                        <Header isSidebarLayout={true} />

                        <main
                            className={cx(
                                styles.main,
                                styles['sidebar-layout'],
                                styles['header-spacing'],
                            )}
                        >
                            <Sidebar>
                                {/* TODO: Pass app logo */}
                                <NavigationList />
                            </Sidebar>

                            {children}
                        </main>

                        <Notifications />

                        <NetworkStatusIndicator />

                        <ScrollTopButton />
                    </Providers>

                    <div id="modal-root" />
                    <div id="drawer-root" />
                </ErrorBoundary>
            </body>
        </html>
    );
}
