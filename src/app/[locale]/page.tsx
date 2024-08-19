import { Metadata } from 'next';

import { Api } from 'api';
import Container from 'components/container/Container';
import Typography from 'components/typography/Typography';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

const pageName = 'HomePage';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function HomePage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    const { nickname, defaultCurrency, timeZone } = await Api.getUser('62');

    return (
        <Container>
            <Typography element="h1" variant="h3">
                {title}
            </Typography>

            <Typography element="p" variant="body1">
                nickname: {nickname}
            </Typography>

            <Typography element="p" variant="body1">
                defaultCurrency: {defaultCurrency}
            </Typography>

            <Typography element="p" variant="body1">
                timeZone: {timeZone}
            </Typography>
        </Container>
    );
}
