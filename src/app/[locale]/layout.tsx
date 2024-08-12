import { PropsWithChildren } from 'react';

import cx from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import 'styles/globals.scss';
import styles from 'app/[locale]/layout.module.scss';
import Providers from 'app/[locale]/providers';
import CookiesAgreementModal from 'components/cookies-agreement-modal/CookiesAgreementModal';
import ErrorBoundary from 'components/error-boundary/ErrorBoundary';
import Header from 'components/header/Header';
import NavigationList from 'components/navigation-list/NavigationList';
import NetworkStatusIndicator from 'components/network-status-indicator/NetworkStatusIndicator';
import Notifications from 'components/notifications/Notifications';
import ScrollTopButton from 'components/scroll-top-button/ScrollTopButton';
import Sidebar from 'components/sidebar/Sidebar';
import { IPageWithLocaleParamProps } from 'types/pageProps';
import { getAppPageMetadata } from 'utils/getAppPageMetadata';

const INTER = Inter({ subsets: ['latin'] });

export async function generateMetadata({
    params: { locale },
}: IPageWithLocaleParamProps): Promise<Metadata> {
    return getAppPageMetadata(locale);
}

type TRootLocaleLayoutProps = IPageWithLocaleParamProps & PropsWithChildren;

export default async function RootLocaleLayout({
    children,
    params: { locale },
}: TRootLocaleLayoutProps): Promise<JSX.Element> {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={INTER.className}>
                <ErrorBoundary>
                    <NextIntlClientProvider messages={messages}>
                        <Providers>
                            <Header isSidebarLayout={true} />

                            <main
                                className={cx(
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

                            <CookiesAgreementModal />
                        </Providers>

                        <div id="modal-root" />
                        <div id="drawer-root" />
                        <div id="notifications-root" />
                    </NextIntlClientProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
