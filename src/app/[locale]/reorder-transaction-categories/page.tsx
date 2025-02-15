import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import { URL_HEADER } from 'constants/headers';
import TransactionCategoriesReorderingList from 'features/transaction-categories-reordering/components/transaction-categories-reordering-list/TransactionCategoriesReorderingList';
import { getTransactionCategoryListCurrentTabFromUrl } from 'features/transaction-category-list-tabs/utils/transactionCategoryListCurrentTab.utils';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';
import { getAppPageTitle } from 'utils/serverTranslations.utils';

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
        log('reorder categories page error', error);

        return (
            <TransactionCategoriesEmptyState categoriesType={categoriesType} />
        );
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionCategoriesReorderingList />
            </HydrationBoundary>
        </Container>
    );
}
