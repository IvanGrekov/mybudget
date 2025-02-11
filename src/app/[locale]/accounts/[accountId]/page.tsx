import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import AccountsEmptyState from 'components/accounts-empty-state/AccountsEmptyState';
import AppHeader from 'components/app-header/AppHeader';
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs';
import Container from 'components/container/Container';
import EntityIcon from 'components/entity-icon/EntityIcon';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import { EIconSizes } from 'components/icons/types/iconSizes';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import { URL_HEADER } from 'constants/headers';
import { DEFAULT_OFFSET } from 'constants/pagination';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { EAppRoutes } from 'types/appRoutes';
import { User, Account, Transaction } from 'types/generated.types';
import { IWithIdParamProps, IWithLocaleParamProps } from 'types/pageProps';
import { IPaginatedItemsResult } from 'types/paginatedItemsResult';
import { Maybe } from 'types/utility.types';
import { prefetchAllAccounts } from 'utils/getAllAccounts.utils';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { prefetchAllTransactionCategories } from 'utils/prefetchAllTransactionCategories';
import {
    getSingleAccountQueryKey,
    getTransactionsQueryKey,
    getCalculatedTransactionValuesQueryKey,
} from 'utils/queryKey.utils';
import { getTransactionListFiltersFromUrl } from 'utils/transactionListFilters.utils';

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
    params: { locale, accountId: accountIdParam },
}: IWithIdParamProps & IWithLocaleParamProps): Promise<JSX.Element> {
    const listPageTitle = await getPageHeaderTitle({
        locale,
        pageName: 'Accounts',
    });
    const detailsTitle = await getPageHeaderTitle({
        locale,
        pageName: 'Details',
    });
    const pageTitle = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();

    let me: Maybe<User> = null;
    let account: Maybe<Account> = null;

    const accountId = Number(accountIdParam);
    const { types, categoryId, from, to } = getTransactionListFiltersFromUrl(
        headers().get(URL_HEADER) || '',
    );

    try {
        me = await getMeOnServerSide(queryClient);
        account = await queryClient.fetchQuery({
            queryKey: getSingleAccountQueryKey(accountId),
            queryFn: () => SERVER_MY_BUDGET_API.getAccount(accountId),
        });

        if (account) {
            await queryClient.prefetchInfiniteQuery({
                queryKey: getTransactionsQueryKey({
                    types,
                    accountId,
                    categoryId,
                    from,
                    to,
                }),
                queryFn: () =>
                    SERVER_MY_BUDGET_API.getTransactions({
                        types,
                        accountId,
                        categoryId,
                        from,
                        to,
                    }),
                initialPageParam: DEFAULT_OFFSET,
                getNextPageParam: (
                    lastPage: Maybe<IPaginatedItemsResult<Transaction>>,
                ) => {
                    if (!lastPage?.hasMore) {
                        return;
                    }

                    return lastPage.page + 1;
                },
            });

            await queryClient.prefetchQuery({
                queryKey: getCalculatedTransactionValuesQueryKey({
                    accountId,
                    from,
                    to,
                }),
                queryFn: () =>
                    SERVER_MY_BUDGET_API.getCalculatedTransactionValues({
                        accountId,
                        from,
                        to,
                    }),
            });
            await prefetchAllAccounts(queryClient);
            await prefetchAllTransactionCategories(queryClient);
        }
    } catch (error) {
        log('single account page error', error);
    }

    if (!me) {
        return <MeEmptyState />;
    }

    const {
        name: accountName,
        iconName: accountIconName,
        iconColor: accountIconColor,
    } = account || {};

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={me.defaultCurrency} />

                <AppHeader
                    title={accountName || pageTitle}
                    titleEl={
                        account ? (
                            <EntityIcon
                                iconName={accountIconName}
                                iconColor={accountIconColor}
                                size={EIconSizes.medium}
                            />
                        ) : undefined
                    }
                />

                <Breadcrumbs
                    items={[
                        {
                            label: listPageTitle,
                            href: account
                                ? `${EAppRoutes.Accounts}?${TAB_PARAM_NAME}=${account.type}`
                                : EAppRoutes.Accounts,
                        },
                        {
                            label: detailsTitle,
                        },
                    ]}
                />

                {account ? (
                    <AccountDetails account={account} />
                ) : (
                    <AccountsEmptyState
                        isSingleAccount={true}
                        notWrappedByContainer={true}
                    />
                )}
            </HydrationBoundary>
        </Container>
    );
}
