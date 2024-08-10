import { Metadata } from 'next';

import Container from 'components/container/Container';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { EAppRoutes } from 'types/appRoutes';
import { IPageWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export async function generateMetadata({
    params: { locale },
}: IPageWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName: 'AccountsPage' });
}

export default function AccountsPage(): JSX.Element {
    const title = usePageHeaderTitle('AccountsPage');

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>
            <Link href={`${EAppRoutes.Accounts}/1`} text="Account 1" />
        </Container>
    );
}
