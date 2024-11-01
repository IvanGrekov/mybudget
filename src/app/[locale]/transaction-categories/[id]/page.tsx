import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import TransactionCategoryDetails from 'features/transaction-category-details/components/transaction-category-details/TransactionCategoryDetails';
import { IWithIdParamProps, IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'TransactionCategoryDetailsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({
        locale,
        pageName,
    });
}

export default async function TransactionCategoryDetailsPage({
    params: { id, locale },
}: IWithIdParamProps & IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={me.defaultCurrency} />

                <AppHeader title={title} />

                <TransactionCategoryDetails transactionCategoryId={id} />
            </HydrationBoundary>
        </Container>
    );
}
