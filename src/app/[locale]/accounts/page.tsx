import { Metadata } from 'next';

import { Api } from 'api';
import Container from 'components/container/Container';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
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

    const accounts = await Api.getAccounts({
        userId: 62,
    });

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>

            <ul>
                {accounts.map(({ id, name }) => (
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
