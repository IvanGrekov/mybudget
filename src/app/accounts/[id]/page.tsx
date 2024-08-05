import { Metadata } from 'next';

import { EAppTitles } from 'types/appTitles';
import { IPageWithIdParamProps } from 'types/pageWithIdParamProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.AccountDetails),
};

export default function AccountDetails({
    params,
}: IPageWithIdParamProps): JSX.Element {
    return (
        <h1>
            {EAppTitles.AccountDetails} - {params.id}
        </h1>
    );
}
