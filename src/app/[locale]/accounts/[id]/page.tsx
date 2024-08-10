import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import {
    IPageWithIdParamProps,
    IPageWithLocaleParamProps,
} from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export async function generateMetadata({
    params: { locale },
}: IPageWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({
        locale,
        pageName: 'AccountDetailsPage',
    });
}

export default function AccountDetailsPage({
    params,
}: IPageWithIdParamProps): JSX.Element {
    const title = usePageHeaderTitle('AccountDetailsPage');
    const { id } = params;

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>

            <AccountDetails accountId={id} />
        </Container>
    );
}
