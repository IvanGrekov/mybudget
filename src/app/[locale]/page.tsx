import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import styles from 'app/[locale]/page.module.scss';
import Container from 'components/container/Container';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import Spacing from 'components/spacing/Spacing';
import { URL_HEADER } from 'constants/headers';
import { DEFAULT_OFFSET } from 'constants/pagination';
import OverallBalance from 'features/overall-balance/components/overall-balance/OverallBalance';
import TransactionListPage from 'features/transaction-list-page/components/transaction-list-page/TransactionListPage';
import UserCurrencySection from 'features/user-currency-section/user-currency-section/UserCurrencySection';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { User, Transaction } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { IPaginatedItemsResult } from 'types/paginatedItemsResult';
import { Maybe } from 'types/utility.types';
import { prefetchAllAccounts } from 'utils/getAllAccounts.utils';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { prefetchAllTransactionCategories } from 'utils/prefetchAllTransactionCategories';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';
import {
    getAppPageTitle,
    getEmptyStateTranslations,
} from 'utils/serverTranslations.utils';
import { getTransactionListFiltersFromUrl } from 'utils/transactionListFilters.utils';

const pageName = 'HomePage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function HomePage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const emptyStateTranslations = await getEmptyStateTranslations(locale);

    const queryClient = getQueryClient();

    let me: Maybe<User> = null;

    const { types, accountId, categoryId, from, to } =
        getTransactionListFiltersFromUrl(headers().get(URL_HEADER) || '');

    try {
        me = await getMeOnServerSide(queryClient);
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

        await prefetchAllAccounts(queryClient);
        await prefetchAllTransactionCategories(queryClient);
    } catch (error) {
        log('home page error', error);
    }

    if (!me) {
        return <MeEmptyState emptyStateTranslations={emptyStateTranslations} />;
    }

    const { id, defaultCurrency } = me;

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <OverallBalance userCurrency={me.defaultCurrency} />

                <ExchangeRates
                    userCurrency={defaultCurrency}
                    className={styles['exchange-rates']}
                />

                <UserCurrencySection
                    userId={id}
                    userDefaultCurrency={defaultCurrency}
                />

                <Spacing xs={30} sm={40} />

                <TransactionListPage />
            </HydrationBoundary>
        </Container>
    );
}
