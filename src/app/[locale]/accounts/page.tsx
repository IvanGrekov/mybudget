import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import { URL_HEADER } from 'constants/headers';
import AccountList from 'features/account-list/components/account-list/AccountList';
import { getAccountListCurrentTabFromUrl } from 'features/account-list-tabs/utils/accountListCurrentTab.utils';
import OverallBalance from 'features/overall-balance/components/overall-balance/OverallBalance';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAllAccounts } from 'utils/getAllAccounts.utils';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName: 'AccountsPage' });
}

export default async function AccountsPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    const accountsType = getAccountListCurrentTabFromUrl(
        headers().get(URL_HEADER) || '',
    );

    // NOTE: prefetch accounts by type
    await queryClient.prefetchQuery({
        queryKey: getAccountsQueryKey({
            types: [accountsType],
        }),
        queryFn: () =>
            SERVER_MY_BUDGET_API.getAccounts({
                types: [accountsType],
            }),
    });

    const activeAccounts = await getAllAccounts(queryClient);

    if (!activeAccounts?.length) {
        return (
            <Container>
                <EmptyState text="Accounts not found" />
            </Container>
        );
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <OverallBalance userCurrency={me.defaultCurrency} />
                <ExchangeRates userCurrency={me.defaultCurrency} />
                <AccountList />
            </HydrationBoundary>
        </Container>
    );
}
