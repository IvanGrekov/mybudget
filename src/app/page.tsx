import { Metadata } from 'next';

import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(),
};

export default function HomePage(): JSX.Element {
    return <h1>Home</h1>;
}
