import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import { EAppTitles } from 'types/appTitles';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(EAppTitles.Settings),
};

export default function SettingsPage(): JSX.Element {
    return (
        <Container>
            <Typography element="h1" variant="h3">
                {EAppTitles.Settings}
            </Typography>
        </Container>
    );
}
