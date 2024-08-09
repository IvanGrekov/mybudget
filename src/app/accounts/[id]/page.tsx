import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { EAppTitles } from 'types/appTitles';
import { IPageWithIdParamProps } from 'types/pageWithIdParamProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.AccountDetails),
};

export default function AccountDetailsPage({
    params,
}: IPageWithIdParamProps): JSX.Element {
    const { id } = params;

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {EAppTitles.AccountDetails} - {id}
            </Typography>

            <AccountDetails accountId={id} />
        </Container>
    );
}
