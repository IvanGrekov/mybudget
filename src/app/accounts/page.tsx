import { Metadata } from 'next';

import Container from 'components/container/Container';
import Link from 'components/link/Link';
import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.Accounts),
};

export default function AccountsPage(): JSX.Element {
    return (
        <Container>
            <h1>{EAppTitles.Accounts}</h1>
            <Link href="accounts/1" text="Account 1" />
        </Container>
    );
}
