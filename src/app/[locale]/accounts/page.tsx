import { Metadata } from 'next';

import Container from 'components/container/Container';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';
import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.Accounts),
};

export default function AccountsPage(): JSX.Element {
    return (
        <Container>
            <Typography element="h1" variant="h3">
                {EAppTitles.Accounts}
            </Typography>
            <Link href={`${EAppRoutes.Accounts}/1`} text="Account 1" />
        </Container>
    );
}
