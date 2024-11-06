import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import { URL_HEADER } from 'constants/headers';
import TransactionCategoriesList from 'features/transaction-categories-reordering/components/transaction-categories-list/TransactionCategoriesList';
import { getTransactionCategoryListCurrentTabFromUrl } from 'features/transaction-category-list-tabs/utils/transactionCategoryListCurrentTab.utils';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getQueryClient } from 'utils/getQueryClient';
import { getTransactionCategoriesQueryKey } from 'utils/queryKey.utils';

const pageName = 'ReorderTransactionCategoriesPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function ReorderTransactionCategoriesPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();

    const transactionCategoriesType =
        getTransactionCategoryListCurrentTabFromUrl(
            headers().get(URL_HEADER) || '',
        );

    // NOTE: prefetch transaction categories by type
    await queryClient.prefetchQuery({
        queryKey: getTransactionCategoriesQueryKey({
            type: transactionCategoriesType,
        }),
        queryFn: () =>
            SERVER_MY_BUDGET_API.getTransactionCategories({
                type: transactionCategoriesType,
            }),
    });

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionCategoriesList />
            </HydrationBoundary>
        </Container>
    );
}
