import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import UserSettings from 'features/user-settings/components/user-settings/UserSettings';
import { User } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { Maybe } from 'types/utility.types';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import {
    getPageTranslations,
    getAppPageTitle,
    getEmptyStateTranslations,
} from 'utils/serverTranslations.utils';

const pageName = 'SettingsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function SettingsPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const [title] = await getPageTranslations({
        locale,
        pageName,
    });
    const emptyStateTranslations = await getEmptyStateTranslations(locale);

    const queryClient = getQueryClient();

    let me: Maybe<User> = null;

    try {
        me = await getMeOnServerSide(queryClient);
    } catch (error) {
        log('settings page error', error);
    }

    if (!me) {
        return <MeEmptyState emptyStateTranslations={emptyStateTranslations} />;
    }

    return (
        <Container>
            <AppHeader title={title} />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <UserSettings user={me} />
            </HydrationBoundary>
        </Container>
    );
}
