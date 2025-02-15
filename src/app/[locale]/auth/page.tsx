import React from 'react';

import { Metadata } from 'next';

import styles from 'app/[locale]/auth/AuthPage.module.scss';
import AppHeader from 'components/app-header/AppHeader';
import Button from 'components/button/Button';
import Container from 'components/container/Container';
import SignIn from 'features/auth/components/sign-in/SignIn';
import SocialAuth from 'features/auth/components/social-auth/SocialAuth';
import { EAppRoutes } from 'types/appRoutes';
import { IWithLocaleParamProps } from 'types/pageProps';
import {
    getAppPageTitle,
    getPageTranslations,
} from 'utils/serverTranslations.utils';

const pageName = 'SignIn';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function SignInPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const [title, forgotPasswordButtonText] = await getPageTranslations({
        locale,
        pageName,
        keys: ['title', 'forgot-password-button'],
    });

    return (
        <Container>
            <AppHeader title={title} />

            <SignIn />

            <div className={styles.actions}>
                <SocialAuth locale={locale} />

                <Button
                    text={forgotPasswordButtonText}
                    variant="contained"
                    href={`${EAppRoutes.Auth}${EAppRoutes.ResetPassword}`}
                />
            </div>
        </Container>
    );
}
