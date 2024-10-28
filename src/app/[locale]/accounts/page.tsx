import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { EFetchingTags } from 'types/fetchingTags';
import { Account } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'AccountsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function AccountsPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();
    const data: TApiClientResult<Account[]> = await queryClient.fetchQuery({
        queryKey: [EFetchingTags.ACCOUNTS],
        queryFn: () => SERVER_MY_BUDGET_API.getAccounts(),
    });

    if (!data?.length) {
        return (
            <Container>
                <EmptyState text="Accounts not found" />
            </Container>
        );
    }

    return (
        <Container>
            <AppHeader title={title} />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <UnderDevelopmentMessage />
                <ul>
                    {data.map(({ id, name, currency }) => (
                        <li key={id}>
                            <Link href={`${EAppRoutes.Accounts}/${id}`}>
                                <Typography element="p" variant="body1">
                                    {name} - {currency}
                                </Typography>
                            </Link>
                        </li>
                    ))}
                </ul>
            </HydrationBoundary>
        </Container>
    );
}
