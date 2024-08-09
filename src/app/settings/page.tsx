import { Metadata } from 'next';

import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.Settings),
};

export default function SettingsPage(): JSX.Element {
    return <h1>{EAppTitles.Settings}</h1>;
}
