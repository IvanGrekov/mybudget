import { Metadata } from 'next';

import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.TransactionCategories),
};

export default function TransactionCategories(): JSX.Element {
    return <h1>{EAppTitles.TransactionCategories}</h1>;
}
