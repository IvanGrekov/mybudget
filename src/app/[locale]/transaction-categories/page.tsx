import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import { URL_HEADER } from 'constants/headers';
import TransactionCategoryList from 'features/transaction-category-list/components/transaction-category-list/TransactionCategoryList';
import { getTransactionCategoryListCurrentTabFromUrl } from 'features/transaction-category-list/utils/transactionCategoryListCurrentTab.utils';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import {
    TransactionCategory,
    TransactionCategoryStatusEnum,
} from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'TransactionCategoriesPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function TransactionCategoriesPage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    const transactionCategoriesType =
        getTransactionCategoryListCurrentTabFromUrl(
            headers().get(URL_HEADER) || '',
        );

    const activeTransactionCategories: TApiClientResult<TransactionCategory[]> =
        await queryClient.fetchQuery({
            queryKey: [
                EFetchingTags.TRANSACTION_CATEGORIES,
                TransactionCategoryStatusEnum.ACTIVE,
            ],
            queryFn: () =>
                SERVER_MY_BUDGET_API.getTransactionCategories({
                    status: TransactionCategoryStatusEnum.ACTIVE,
                }),
        });

    // NOTE: prefetch transaction categories by type
    await queryClient.prefetchQuery({
        queryKey: [
            EFetchingTags.TRANSACTION_CATEGORIES,
            TransactionCategoryStatusEnum.ACTIVE,
            transactionCategoriesType,
        ],
        queryFn: () =>
            SERVER_MY_BUDGET_API.getTransactionCategories({
                status: TransactionCategoryStatusEnum.ACTIVE,
                type: transactionCategoriesType,
            }),
    });

    if (!activeTransactionCategories?.length) {
        return (
            <Container>
                <EmptyState text="Transaction Categories not found" />
            </Container>
        );
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={me.defaultCurrency} />

                <TransactionCategoryList
                    currentItemsLength={activeTransactionCategories.length}
                />
            </HydrationBoundary>
        </Container>
    );
}
