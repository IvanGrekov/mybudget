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
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { Account } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

const pageName = 'AccountsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
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

    const activeAccounts: TApiClientResult<Account[]> =
        await queryClient.fetchQuery({
            queryKey: getAccountsQueryKey(),
            queryFn: () => SERVER_MY_BUDGET_API.getAccounts(),
        });

    // NOTE: prefetch accounts by type
    await queryClient.prefetchQuery({
        queryKey: getAccountsQueryKey({
            type: accountsType,
        }),
        queryFn: () =>
            SERVER_MY_BUDGET_API.getAccounts({
                type: accountsType,
            }),
    });

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
                <ExchangeRates userCurrency={me.defaultCurrency} />
                <AccountList currentItemsLength={activeAccounts.length} />
            </HydrationBoundary>
        </Container>
    );
}
