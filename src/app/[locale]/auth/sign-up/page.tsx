import React from 'react';

import { Metadata } from 'next';

import styles from 'app/[locale]/auth/AuthPage.module.scss';
import AppHeader from 'components/app-header/AppHeader';
import Container from 'components/container/Container';
import LanguageSwitcher from 'components/language-switcher/LanguageSwitcher';
import SignUp from 'features/auth/components/sign-up/SignUp';
import SocialAuth from 'features/auth/components/social-auth/SocialAuth';
import { IWithLocaleParamProps } from 'types/pageProps';
import { getAppPageTitle } from 'utils/getAppPageTitle';
import { getPageHeaderTitle } from 'utils/getPageHeaderTitle';

const pageName = 'Sign Up';

export async function generateMetadata({
    params: { locale },
}: IWithLocaleParamProps): Promise<Metadata> {
    return getAppPageTitle({ locale, pageName });
}

export default async function SignUpPage({
    params: { locale },
}: IWithLocaleParamProps): Promise<JSX.Element> {
    const title = await getPageHeaderTitle({
        locale,
        pageName,
    });

    return (
        <Container>
            <AppHeader title={title} actions={<LanguageSwitcher />} />

            <SignUp />

            <div className={styles.actions}>
                <SocialAuth locale={locale} />
            </div>
        </Container>
    );
}
