import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import { URL_HEADER } from 'constants/headers';
import OverallBalance from 'features/overall-balance/components/overall-balance/OverallBalance';
import TransactionCategoryList from 'features/transaction-category-list/components/transaction-category-list/TransactionCategoryList';
import { getTransactionCategoryListCurrentTabFromUrl } from 'features/transaction-category-list-tabs/utils/transactionCategoryListCurrentTab.utils';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { TransactionCategory, User } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { calculateActiveTransactionCategories } from 'utils/calculateActiveTransactionCategories';
import { prefetchAllAccounts } from 'utils/getAllAccounts.utils';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName: 'TransactionCategoriesPage' });
}

export default async function TransactionCategoriesPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();

    let me: TApiClientResult<User> = null;
    let activeTransactionCategories: TApiClientResult<TransactionCategory[]> =
        null;

    const categoriesType = getTransactionCategoryListCurrentTabFromUrl(
        headers().get(URL_HEADER) || '',
    );

    try {
        me = await getMeOnServerSide(queryClient);
        activeTransactionCategories = await queryClient.fetchQuery({
            queryKey: getTransactionCategoriesQueryKey(),
            queryFn: () => SERVER_MY_BUDGET_API.getTransactionCategories(),
        });

        // NOTE: prefetch transaction categories by type
        await queryClient.prefetchQuery({
            queryKey: getTransactionCategoriesQueryKey({
                type: categoriesType,
            }),
            queryFn: () =>
                SERVER_MY_BUDGET_API.getTransactionCategories({
                    type: categoriesType,
                }),
        });

        await prefetchAllAccounts(queryClient);
    } catch (error) {
        log('error', error);
    }

    if (!me) {
        return <MeEmptyState />;
    }

    if (!activeTransactionCategories?.length) {
        return <TransactionCategoriesEmptyState />;
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <OverallBalance userCurrency={me.defaultCurrency} />

                <ExchangeRates userCurrency={me.defaultCurrency} />

                <TransactionCategoryList
                    currentItemsLength={calculateActiveTransactionCategories(
                        activeTransactionCategories,
                    )}
                />
            </HydrationBoundary>
        </Container>
    );
}
