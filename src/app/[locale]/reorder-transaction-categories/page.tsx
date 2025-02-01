import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import { URL_HEADER } from 'constants/headers';
import TransactionCategoriesList from 'features/transaction-categories-reordering/components/transaction-categories-list/TransactionCategoriesList';
import { getTransactionCategoryListCurrentTabFromUrl } from 'features/transaction-category-list-tabs/utils/transactionCategoryListCurrentTab.utils';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({
        locale,
        pageName: 'ReorderTransactionCategoriesPage',
    });
}

export default async function ReorderTransactionCategoriesPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();

    const categoriesType = getTransactionCategoryListCurrentTabFromUrl(
        headers().get(URL_HEADER) || '',
    );

    try {
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
    } catch (error) {
        log(error);

        return (
            <TransactionCategoriesEmptyState categoriesType={categoriesType} />
        );
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionCategoriesList />
            </HydrationBoundary>
        </Container>
    );
}
