import React from 'react';

import { Metadata } from 'next';

import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import ResetPassword from 'features/auth/components/reset-password/ResetPassword';
import { IWithLocaleParamProps } from 'types/pageProps';
import {
    getAppPageTitle,
    getPageTranslations,
} from 'utils/serverTranslations.utils';

const pageName = 'ResetPassword';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function ResetPasswordPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const [title] = await getPageTranslations({
        locale,
        pageName,
    });

    return (
        <Container>
            <AppHeader title={title} />

            <ResetPassword />
        </Container>
    );
}
