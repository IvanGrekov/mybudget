import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'HomePage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function HomePage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();
    const data: TApiClientResult<User> = await queryClient.fetchQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => SERVER_MY_BUDGET_API.getMe(),
    });

    if (!data) {
        return (
            <Container>
                <EmptyState text="User not found" />
            </Container>
        );
    }

    const { nickname, defaultCurrency } = data;

    return (
        <Container>
            <AppHeader
                title={title}
                subtitle={`Hello, ${nickname}! Check your transactions here`}
            />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <UnderDevelopmentMessage />

                <ExchangeRates userCurrency={defaultCurrency} />
            </HydrationBoundary>
        </Container>
    );
}
