import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import styles from 'app/[locale]/page.module.scss';
import Container from 'components/container/Container';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import Spacing from 'components/spacing/Spacing';
import { URL_HEADER } from 'constants/headers';
import OverallBalance from 'features/overall-balance/components/overall-balance/OverallBalance';
import TransactionList from 'features/transaction-list/components/transaction-list/TransactionList';
import { getTransactionTypesFromUrl } from 'features/transaction-list/utils/transactionTypeFilterValue.utils';
import UserCurrencySection from 'features/user-currency-section/user-currency-section/UserCurrencySection';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAllAccounts } from 'utils/getAllAccounts';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getQueryClient } from 'utils/getQueryClient';
import { getTransactionsQueryKey } from 'utils/queryKey.utils';

const pageName = 'HomePage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function HomePage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();
    const me = await getMeOnServerSide(queryClient);

    if (!me) {
        return <MeEmptyState />;
    }

    const transactionTypes = getTransactionTypesFromUrl(
        headers().get(URL_HEADER) || '',
    );

    // NOTE: prefetch transactions by type
    await queryClient.prefetchQuery({
        queryKey: getTransactionsQueryKey({ types: transactionTypes }),
        queryFn: () =>
            SERVER_MY_BUDGET_API.getTransactions({
                types: transactionTypes,
            }),
    });

    await getAllAccounts(queryClient);

    const { id, defaultCurrency } = me;

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <OverallBalance userCurrency={me.defaultCurrency} />

                <ExchangeRates
                    userCurrency={defaultCurrency}
                    className={styles['exchange-rates']}
                />

                <UserCurrencySection
                    userId={id}
                    userDefaultCurrency={defaultCurrency}
                />

                <Spacing xs={30} sm={40} />

                <TransactionList />
            </HydrationBoundary>
        </Container>
    );
}
