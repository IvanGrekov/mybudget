import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import PageError from 'components/page-error/PageError';
import Typography from 'components/typography/Typography';
import { MyBudgetApi } from 'models/myBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

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

    // TODO: Get rid of hardcoded user id
    const { data, error } = await MyBudgetApi.getUser('62');

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

    const { nickname, defaultCurrency, timeZone } = data;

    return (
        <Container>
            <AppHeader title={title} subtitle="Check your transactions here" />

            <Typography element="p" variant="body1">
                nickname: {nickname}
            </Typography>

            <Typography element="p" variant="body1">
                defaultCurrency: {defaultCurrency}
            </Typography>

            <Typography element="p" variant="body1">
                timeZone: {timeZone}
            </Typography>
        </Container>
    );
}
