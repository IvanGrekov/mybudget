import { Metadata } from 'next';

import { EAppTitles } from 'types/appTitles';
import { IPageWithIdParamProps } from 'types/pageWithIdParamProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.TransactionCategoryDetails),
};

export default function TransactionCategoryDetails({
    params,
}: IPageWithIdParamProps): JSX.Element {
    return (
        <h1>
            {EAppTitles.TransactionCategoryDetails} - {params.id}
        </h1>
    );
}
