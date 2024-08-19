import { Metadata } from 'next';

import Container from 'components/container/Container';
import Link from 'components/link/Link';
import Typography from 'components/typography/Typography';
import { EAppRoutes } from 'types/appRoutes';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

const pageName = 'TransactionCategoriesPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function TransactionCategoriesPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

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
