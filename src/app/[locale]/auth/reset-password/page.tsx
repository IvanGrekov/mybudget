import React from 'react';

import { Metadata } from 'next';

import styles from 'app/[locale]/auth/reset-password/ResetPasswordPage.module.scss';
import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import ErrorMessage from 'components/error-message/ErrorMessage';
import ResetPassword from 'features/auth/components/reset-password/ResetPassword';
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

            <ErrorMessage
                className={styles['error-message']}
                message="Sorry, I didn't buy an email domain for this project, so I can't send you a verification code. But trust me, I get your verification codes in mailtrap service ;D"
            />

            <ResetPassword />
        </Container>
    );
}
