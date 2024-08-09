import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { EAppTitles } from 'types/appTitles';
import { IPageWithIdParamProps } from 'types/pageWithIdParamProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.TransactionCategoryDetails),
};

export default function TransactionCategoryDetailsPage({
    params,
}: IPageWithIdParamProps): JSX.Element {
    const { id } = params;

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {EAppTitles.TransactionCategoryDetails} - {id}
            </Typography>

            <TransactionCategoryDetails transactionCategoryId={id} />
        </Container>
    );
}
