import { Metadata } from 'next';

import Container from 'components/container/Container';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';
import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.TransactionCategories),
};

export default function TransactionCategoriesPage(): JSX.Element {
    return (
        <Container>
            <Typography element="h1" variant="h3">
                {EAppTitles.TransactionCategories}
            </Typography>
            <Link
                href={`${EAppRoutes.TransactionCategories}/1`}
                text="Transaction Category 1"
            />
        </Container>
    );
}
