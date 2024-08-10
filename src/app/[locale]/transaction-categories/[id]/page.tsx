import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
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
        pageName: 'TransactionCategoryDetailsPage',
    });
}

export default function TransactionCategoryDetailsPage({
    params,
}: IPageWithIdParamProps): JSX.Element {
    const title = usePageHeaderTitle('TransactionCategoryDetailsPage');
    const { id } = params;

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>

            <TransactionCategoryDetails transactionCategoryId={id} />
        </Container>
    );
}
