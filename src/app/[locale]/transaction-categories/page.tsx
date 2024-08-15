import { Metadata } from 'next';

import Container from 'components/container/Container';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { EAppRoutes } from 'types/appRoutes';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName: 'TransactionCategoriesPage' });
}

export default function TransactionCategoriesPage(): JSX.Element {
    const title = usePageHeaderTitle('TransactionCategoriesPage');

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>
            <Link
                href={`${EAppRoutes.TransactionCategories}/1`}
                text="Transaction Category 1"
            />
        </Container>
    );
}
