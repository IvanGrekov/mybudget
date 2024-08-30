import { PropsWithChildren } from 'react';

import cx from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
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
import PreferencesSwitchers from 'components/preferences-switchers/PreferencesSwitchers';
import ScrollTopButton from 'components/scroll-top-button/ScrollTopButton';
import Sidebar from 'components/sidebar/Sidebar';
import { WebVitals } from 'components/web-vitals/WebVitals';
import { IWithLocaleParamProps } from 'types/pageProps';
import { ETheme } from 'types/theme';
import { getAppPageMetadata } from 'utils/getAppPageMetadata';
import { getIsDarkUserThemeFromCookie } from 'utils/userThemeFromCookie.utils';

const INTER = Inter({ subsets: ['latin'] });

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageMetadata(locale);
}

type TRootLocaleLayoutProps = IWithLocaleParamProps & PropsWithChildren;

export default async function RootLocaleLayout({
    children,
    params: { locale },
}: TRootLocaleLayoutProps): Promise<JSX.Element> {
    const messages = await getMessages();
    const isDarkTheme = getIsDarkUserThemeFromCookie(cookies());

    return (
        <html lang={locale} className={isDarkTheme ? ETheme.DARK : undefined}>
            <body className={INTER.className}>
                <ErrorBoundary>
                    <WebVitals />
                    <NextIntlClientProvider messages={messages}>
                        <Providers>
                            <Header isSidebarLayout={true} />

                            <main
                                className={cx(
                                    styles['sidebar-layout'],
                                    styles['header-spacing'],
                                )}
                            >
                                <Sidebar
                                    mobileSidebarHeader={
                                        <PreferencesSwitchers />
                                    }
                                >
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
