import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { MyBudgetApi } from 'models/myBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { EFetchingTags } from 'types/fetchingTags';
import { TransactionCategory } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
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
    let data: TApiClientResult<TransactionCategory[]> = null;

    // TODO: Get rid of hardcoded user id
    data = await queryClient.fetchQuery({
        queryKey: [EFetchingTags.TRANSACTION_CATEGORIES],
        queryFn: () =>
            MyBudgetApi.getTransactionCategories({
                userId: 72,
            }),
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
            <AppHeader title={title} />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <ul>
                    {data.map(({ id, name }) => (
                        <li key={id}>
                            <Link
                                href={`${EAppRoutes.TransactionCategories}/${id}`}
                            >
                                <Typography element="p" variant="body1">
                                    {name}
                                </Typography>
                            </Link>
                        </li>
                    ))}
                </ul>
            </HydrationBoundary>
        </Container>
    );
}
