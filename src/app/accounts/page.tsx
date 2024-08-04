import { Metadata } from 'next';

import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.Accounts),
};

export default function Accounts(): JSX.Element {
    return <h1>{EAppTitles.Accounts}</h1>;
}
