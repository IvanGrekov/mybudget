import { Metadata } from 'next';

import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(),
};

export default function Home(): JSX.Element {
    return <h1>Home</h1>;
}
