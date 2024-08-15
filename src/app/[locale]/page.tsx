import { Metadata } from 'next';

import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import { usePageHeaderTitle } from 'hooks/usePageHeaderTitle';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName: 'HomePage' });
}

export default function HomePage(): JSX.Element {
    const title = usePageHeaderTitle('HomePage');

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>
        </Container>
    );
}
