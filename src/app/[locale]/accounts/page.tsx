import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import Link from 'components/link/Link';
import PageError from 'components/page-error/PageError';
import Typography from 'components/typography/Typography';
import { MyBudgetApi } from 'models/myBudgetApi';
import { EAppRoutes } from 'types/appRoutes';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

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

    // TODO: Get rid of hardcoded user id
    const { data, error } = await MyBudgetApi.getAccounts({
        userId: 62,
    });

    if (error) {
        return (
            <Container>
                <PageError error={error} />
            </Container>
        );
    }

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

            <ul>
                {data.map(({ id, name }) => (
                    <li key={id}>
                        <Link href={`${EAppRoutes.Accounts}/${id}`}>
                            <Typography element="p" variant="body1">
                                {name}
                            </Typography>
                        </Link>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
