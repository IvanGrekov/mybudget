import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import PageError from 'components/page-error/PageError';
import UserSettings from 'features/user-settings/components/user-settings/UserSettings';
import { MyBudgetApi } from 'models/myBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

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

    // TODO: Get rid of hardcoded user id
    const { data, error } = await MyBudgetApi.getUser(68);

    if (error) {
        return (
            <Container>
                <PageError error={error} />
            </Container>
        );
    }

    if (!data) {
        return (
            <Container>
                <EmptyState text="User not found" />
            </Container>
        );
    }

    const { id, timeZone, nickname } = data;

    return (
        <Container>
            <AppHeader title={title} />

            <UserSettings
                userId={id}
                userTimeZone={timeZone}
                userNickname={nickname}
            />
        </Container>
    );
}
