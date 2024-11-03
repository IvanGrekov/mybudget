import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import { URL_HEADER } from 'constants/headers';
import { getAccountListCurrentTabFromUrl } from 'features/account-list-tabs/utils/accountListCurrentTab.utils';
import AccountReorderingList from 'features/accounts-reordering/components/account-reordering-list/AccountReorderingList';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getQueryClient } from 'utils/getQueryClient';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

const pageName = 'ReorderAccountsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function ReorderAccountsPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();

    const accountsType = getAccountListCurrentTabFromUrl(
        headers().get(URL_HEADER) || '',
    );

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

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <AccountReorderingList />
            </HydrationBoundary>
        </Container>
    );
}
