import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import TransactionCategoryCard from 'features/transaction-category-list/components/transaction-category-card/TransactionCategoryCard';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { TransactionCategory } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'TransactionCategoriesPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function TransactionCategoriesPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    const data: TApiClientResult<TransactionCategory[]> =
        await queryClient.fetchQuery({
            queryKey: [EFetchingTags.TRANSACTION_CATEGORIES],
            queryFn: () => SERVER_MY_BUDGET_API.getTransactionCategories(),
        });

    if (!data?.length) {
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

                <AppHeader title={title} />

                <UnderDevelopmentMessage />
                <ul>
                    {data.map((transactionCategory) => (
                        <li key={transactionCategory.id}>
                            <TransactionCategoryCard
                                transactionCategory={transactionCategory}
                            />
                        </li>
                    ))}
                </ul>
            </HydrationBoundary>
        </Container>
    );
}
