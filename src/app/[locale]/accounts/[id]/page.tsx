import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import AccountsEmptyState from 'components/accounts-empty-state/AccountsEmptyState';
import AppHeader from 'components/app-header/AppHeader';
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs';
import Container from 'components/container/Container';
import EntityIcon from 'components/entity-icon/EntityIcon';
import ExchangeRates from 'components/exchange-rates/ExchangeRates';
import { EIconSizes } from 'components/icons/types/iconSizes';
import MeEmptyState from 'components/me-empty-state/MeEmptyState';
import AccountDetails from 'features/account-details/components/account-details/AccountDetails';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { User, Account } from 'types/generated.types';
import { IWithIdParamProps, IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getMeOnServerSide } from 'utils/getMeForServer';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';
import { getQueryClient } from 'utils/getQueryClient';
import log from 'utils/log';
import { getSingleAccountQueryKey } from 'utils/queryKey.utils';

const pageName = 'AccountDetailsPage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({
        locale,
        pageName,
    });
}

export default async function AccountDetailsPage({
    params: { locale, id },
}: IWithIdParamProps & IWithLocaleParamProps): Promise<JSX.Element> {
    const listPageTitle = await getPageHeaderTitle({
        locale,
        pageName: 'Accounts',
    });
    const detailsTitle = await getPageHeaderTitle({
        locale,
        pageName: 'Details',
    });
    const pageTitle = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const queryClient = getQueryClient();

    let me: TApiClientResult<User> = null;
    let account: TApiClientResult<Account> = null;

    const accountId = Number(id);

    try {
        me = await getMeOnServerSide(queryClient);
        account = await queryClient.fetchQuery({
            queryKey: getSingleAccountQueryKey(accountId),
            queryFn: () => SERVER_MY_BUDGET_API.getAccount(accountId),
        });
    } catch (error) {
        log(error);
    }

    if (!me) {
        return <MeEmptyState />;
    }

    const {
        name: accountName,
        iconName: accountIconName,
        iconColor: accountIconColor,
    } = account || {};

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ExchangeRates userCurrency={me.defaultCurrency} />

                <AppHeader
                    title={accountName || pageTitle}
                    titleEl={
                        account ? (
                            <EntityIcon
                                iconName={accountIconName}
                                iconColor={accountIconColor}
                                size={EIconSizes.medium}
                            />
                        ) : undefined
                    }
                />

                <Breadcrumbs
                    items={[
                        {
                            label: listPageTitle,
                            href: EAppRoutes.Accounts,
                        },
                        {
                            label: detailsTitle,
                        },
                    ]}
                />

                {account ? (
                    <AccountDetails account={account} />
                ) : (
                    <AccountsEmptyState
                        isSingleAccount={true}
                        notWrappedByContainer={true}
                    />
                )}
            </HydrationBoundary>
        </Container>
    );
}
