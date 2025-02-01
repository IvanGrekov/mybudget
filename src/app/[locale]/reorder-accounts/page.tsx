import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import AccountsEmptyState from 'components/accounts-empty-state/AccountsEmptyState';
import Container from 'components/container/Container';
import { URL_HEADER } from 'constants/headers';
import { getAccountListCurrentTabFromUrl } from 'features/account-list-tabs/utils/accountListCurrentTab.utils';
import AccountReorderingList from 'features/accounts-reordering/components/account-reordering-list/AccountReorderingList';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { getAccountsQueryKey } from 'utils/queryKey.utils';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName: 'ReorderAccountsPage' });
}

export default async function ReorderAccountsPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();

    const accountsType = getAccountListCurrentTabFromUrl(
        headers().get(URL_HEADER) || '',
    );

    try {
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
    } catch (error) {
        log(error);

        return <AccountsEmptyState accountsType={accountsType} />;
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <AccountReorderingList />
            </HydrationBoundary>
        </Container>
    );
}
