import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import styles from 'app/[locale]/page.module.scss';
import Container from 'components/container/Container';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import UserCurrencySection from 'features/user-currency-section/user-currency-section/UserCurrencySection';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'HomePage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function HomePage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    const { id, defaultCurrency } = me;

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates
                    userCurrency={defaultCurrency}
                    className={styles['exchange-rates']}
                />

                <UserCurrencySection
                    userId={id}
                    userDefaultCurrency={defaultCurrency}
                />

                <UnderDevelopmentMessage />
            </HydrationBoundary>
        </Container>
    );
}
