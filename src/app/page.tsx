import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export const metadata: Metadata = {
    title: getAppPageTitle(),
};

export default function HomePage(): JSX.Element {
    return (
        <Container>
            <Typography element="h1" variant="h3">
                Home
            </Typography>
        </Container>
    );
}
