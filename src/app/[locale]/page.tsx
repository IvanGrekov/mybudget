import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import Typography from 'components/typography/Typography';
import { MyBudgetApi } from 'models/myBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMockedUserId } from 'utils/getMockedUserId';
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
    let data: TApiClientResult<User> = null;

    // TODO: Get rid of hardcoded user id
    data = await queryClient.fetchQuery({
        queryKey: [EFetchingTags.USER, { id: getMockedUserId() }],
        queryFn: () => MyBudgetApi.getUser(getMockedUserId()),
    });

    if (!data) {
        return (
            <Container>
                <EmptyState text="User not found" />
            </Container>
        );
    }

    const { nickname, defaultCurrency, timeZone } = data;

    return (
        <Container>
            <AppHeader title={title} subtitle="Check your transactions here" />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Typography element="p" variant="body1">
                    nickname: {nickname}
                </Typography>
                <Typography element="p" variant="body1">
                    defaultCurrency: {defaultCurrency}
                </Typography>
                <Typography element="p" variant="body1">
                    timeZone: {timeZone}
                </Typography>
            </HydrationBoundary>
        </Container>
    );
}
