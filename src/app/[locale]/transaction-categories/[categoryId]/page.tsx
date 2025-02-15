import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import AppHeader from 'components/app-header/AppHeader';
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs';
import Container from 'components/container/Container';
import EntityIcon from 'components/entity-icon/EntityIcon';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import { EIconSizes } from 'components/icons/types/iconSizes';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import TransactionCategoriesEmptyState from 'components/transaction-categories-empty-state/TransactionCategoriesEmptyState';
import { URL_HEADER } from 'constants/headers';
import { DEFAULT_OFFSET } from 'constants/pagination';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { EAppRoutes } from 'types/appRoutes';
import { Transaction, TransactionCategory, User } from 'types/generated.types';
import { IWithIdParamProps, IWithLocaleParamProps } from 'types/pageProps';
import { IPaginatedItemsResult } from 'types/paginatedItemsResult';
import { Maybe } from 'types/utility.types';
import { prefetchAllAccounts } from 'utils/getAllAccounts.utils';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { prefetchAllTransactionCategories } from 'utils/prefetchAllTransactionCategories';
import {
    getSingleTransactionCategoryQueryKey,
    getTransactionsQueryKey,
    getCalculatedTransactionValuesQueryKey,
} from 'utils/queryKey.utils';
import {
    getPageTranslations,
    getAppPageTitle,
    getEntityNameTranslations,
} from 'utils/serverTranslations.utils';
import { getTransactionListFiltersFromUrl } from 'utils/transactionListFilters.utils';

const pageName = 'TransactionCategoryDetailsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({
        locale,
        pageName,
    });
}

export default async function TransactionCategoryDetailsPage({
    params: { locale, categoryId: categoryIdParam },
}: IWithIdParamProps & IWithLocaleParamProps): Promise<JSX.Element> {
    const [listPageTitle] = await getPageTranslations({
        locale,
        pageName: 'Categories',
    });
    const [detailsTitle] = await getPageTranslations({
        locale,
        pageName: 'Details',
    });
    const [pageTitle] = await getPageTranslations({
        locale,
        pageName,
    });
    const entityNameTranslations = await getEntityNameTranslations(locale);

    const queryClient = getQueryClient();

    let me: Maybe<User> = null;
    let category: Maybe<TransactionCategory> = null;

    const categoryId = Number(categoryIdParam);
    const { types, accountId, from, to } = getTransactionListFiltersFromUrl(
        headers().get(URL_HEADER) || '',
    );

    try {
        me = await getMeOnServerSide(queryClient);
        category = await queryClient.fetchQuery({
            queryKey: getSingleTransactionCategoryQueryKey(categoryId),
            queryFn: () =>
                SERVER_MY_BUDGET_API.getTransactionCategory(categoryId),
        });

        if (category) {
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
                    categoryId,
                    from,
                    to,
                }),
                queryFn: () =>
                    SERVER_MY_BUDGET_API.getCalculatedTransactionValues({
                        categoryId,
                        from,
                        to,
                    }),
            });
            await prefetchAllAccounts(queryClient);
            await prefetchAllTransactionCategories(queryClient);
        }
    } catch (error) {
        log('single category page error', error);
    }

    if (!me) {
        return <MeEmptyState />;
    }

    const {
        name: categoryName,
        iconName: categoryIconName,
        iconColor: categoryIconColor,
    } = category || {};

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={me.defaultCurrency} />

                <AppHeader
                    title={categoryName || pageTitle}
                    titleEl={
                        category ? (
                            <EntityIcon
                                iconName={categoryIconName}
                                iconColor={categoryIconColor}
                                size={EIconSizes.medium}
                                isCategory={true}
                            />
                        ) : undefined
                    }
                />

                <Breadcrumbs
                    items={[
                        {
                            label: listPageTitle,
                            href: category
                                ? `${EAppRoutes.TransactionCategories}?${TAB_PARAM_NAME}=${category.type}`
                                : EAppRoutes.TransactionCategories,
                        },
                        {
                            label: detailsTitle,
                        },
                    ]}
                />

                {category ? (
                    <TransactionCategoryDetails
                        transactionCategory={category}
                        entityNameTranslations={entityNameTranslations}
                    />
                ) : (
                    <TransactionCategoriesEmptyState
                        entityNameTranslations={entityNameTranslations}
                        isSingleCategory={true}
                        notWrappedByContainer={true}
                    />
                )}
            </HydrationBoundary>
        </Container>
    );
}
