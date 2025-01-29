import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import EntityIcon from 'components/entity-icon/EntityIcon';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import { EIconSizes } from 'components/icons/types/iconSizes';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';
import { IWithIdParamProps, IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { getSingleTransactionCategoryQueryKey } from 'utils/queryKey.utils';

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
    params: { id, locale },
}: IWithIdParamProps & IWithLocaleParamProps): Promise<JSX.Element> {
    const listPageTitle = await getPageHeaderTitle({
        locale,
        pageName: 'Categories',
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
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    const categoryId = Number(id);
    let category: null | TApiClientResult<TransactionCategory> = null;

    try {
        category = await queryClient.fetchQuery({
            queryKey: getSingleTransactionCategoryQueryKey(categoryId),
            queryFn: () =>
                SERVER_MY_BUDGET_API.getTransactionCategory(categoryId),
        });
    } catch (error) {
        log(error);
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
                            href: EAppRoutes.TransactionCategories,
                        },
                        {
                            label: detailsTitle,
                        },
                    ]}
                />

                {category ? (
                    <TransactionCategoryDetails
                        transactionCategory={category}
                    />
                ) : (
                    <EmptyState text="Transaction Category not found" />
                )}
            </HydrationBoundary>
        </Container>
    );
}
