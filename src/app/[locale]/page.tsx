import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import styles from 'app/[locale]/page.module.scss';
import Container from 'components/container/Container';
import EmptyState from 'components/empty-state/EmptyState';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import UserCurrencySection from 'features/user-currency-section/user-currency-section/UserCurrencySection';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getQueryClient } from 'utils/getQueryClient';

const pageName = 'HomePage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function HomePage(): Promise<JSX.Element> {
    const queryClient = getQueryClient();
    const data: TApiClientResult<User> = await queryClient.fetchQuery({
        queryKey: [EFetchingTags.ME],
        queryFn: () => SERVER_MY_BUDGET_API.getMe(),
    });

    if (!data) {
        return (
            <Container>
                <EmptyState text="User not found" />
            </Container>
        );
    }

    const { id, defaultCurrency } = data;

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={defaultCurrency} />

                <div className={styles.actions}>
                    <UserCurrencySection
                        userId={id}
                        userDefaultCurrency={defaultCurrency}
                    />
                </div>

                <UnderDevelopmentMessage />
            </HydrationBoundary>
        </Container>
    );
}
