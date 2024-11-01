import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { IWithIdParamProps, IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'AccountDetailsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({
        locale,
        pageName,
    });
}

export default async function AccountDetailsPage({
    params: { locale, id },
}: IWithIdParamProps & IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={me.defaultCurrency} />

                <AppHeader title={title} />

                <AccountDetails accountId={id} />
            </HydrationBoundary>
        </Container>
    );
}
