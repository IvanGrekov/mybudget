import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import UserSettings from 'features/user-settings/components/user-settings/UserSettings';
import { MyBudgetApi } from 'models/myBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'SettingsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function SettingsPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();
    let data: TApiClientResult<User> = null;

    data = await queryClient.fetchQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => MyBudgetApi.getMe(),
    });

    if (!data) {
        return (
            <Container>
                <EmptyState text="User not found" />
            </Container>
        );
    }

    const { id, nickname, timeZone } = data;

    return (
        <Container>
            <AppHeader title={title} />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <UserSettings
                    userId={id}
                    userNickname={nickname}
                    userTimeZone={timeZone}
                />
            </HydrationBoundary>
        </Container>
    );
}
