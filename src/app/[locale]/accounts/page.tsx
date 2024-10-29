import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import { URL_HEADER } from 'constants/headers';
import AccountList from 'features/account-list/components/account-list/AccountList';
import { getAccountListCurrentTabFromUrl } from 'features/account-list/utils/accountListCurrentTab.utils';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { Account, AccountStatusEnum } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'AccountsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function AccountsPage(): Promise<JSX.Element> {
    const accountsType = getAccountListCurrentTabFromUrl(
        headers().get(URL_HEADER) || '',
    );

    const queryClient = getQueryClient();

    const activeAccounts: TApiClientResult<Account[]> =
        await queryClient.fetchQuery({
            queryKey: [EFetchingTags.ACCOUNTS, AccountStatusEnum.ACTIVE],
            queryFn: () =>
                SERVER_MY_BUDGET_API.getAccounts({
                    status: AccountStatusEnum.ACTIVE,
                }),
        });

    await queryClient.prefetchQuery({
        queryKey: [
            EFetchingTags.ACCOUNTS,
            accountsType,
            AccountStatusEnum.ACTIVE,
        ],
        queryFn: () =>
            SERVER_MY_BUDGET_API.getAccounts({
                status: AccountStatusEnum.ACTIVE,
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
                <AccountList currentItemsLength={activeAccounts.length} />
            </HydrationBoundary>
        </Container>
    );
}
