import { Metadata } from 'next';

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
        <>
            <h1>
                {EAppTitles.AccountDetails} - {id}
            </h1>

            <AccountDetails accountId={id} />
        </>
    );
}
