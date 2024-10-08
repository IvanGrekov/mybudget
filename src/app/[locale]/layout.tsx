import { PropsWithChildren } from 'react';

import cx from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import 'styles/globals.scss';

import styles from 'app/[locale]/layout.module.scss';
import Providers from 'app/[locale]/providers';
import AppLogo from 'components/app-logo/AppLogo';
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
import { URL_HEADER } from 'constants/headers';
import { IWithLocaleParamProps } from 'types/pageProps';
import { ETheme } from 'types/theme';
import { getAppPageMetadata } from 'utils/getAppPageMetadata';
import { getIsAuthPage } from 'utils/getIsAuthPage';
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

    const isAuthPage = getIsAuthPage(headers().get(URL_HEADER));

    return (
        <html lang={locale} className={isDarkTheme ? ETheme.DARK : undefined}>
            <body className={INTER.className}>
                <ErrorBoundary>
                    <WebVitals />
                    <NextIntlClientProvider messages={messages}>
                        <Providers>
                            <Header isSidebarLayout={!isAuthPage} />

                            <main
                                className={cx(styles['header-spacing'], {
                                    [styles['sidebar-layout']]: !isAuthPage,
                                })}
                            >
                                {!isAuthPage && (
                                    <Sidebar
                                        mobileSidebarHeader={
                                            <PreferencesSwitchers />
                                        }
                                    >
                                        <div
                                            className={
                                                styles['sidebar-content']
                                            }
                                        >
                                            <AppLogo />
                                            <NavigationList />
                                        </div>
                                    </Sidebar>
                                )}

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
