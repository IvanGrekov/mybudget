import React from 'react';

import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import Link from 'components/link/Link';
import { EAppRoutes } from 'types/appRoutes';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

const pageName = 'Reset Password';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function ResetPasswordPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    return (
        <Container>
            <AppHeader title={title} />

            <Link href={`${EAppRoutes.Auth}`} text="Cancel" />
        </Container>
    );
}
