'use client';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import styles from 'features/auth/components/social-auth/SocialAuth.module.scss';

interface ISocialAuthProps {
    locale: string;
}

export default function SocialAuth({ locale }: ISocialAuthProps): JSX.Element {
    const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!clientId || !apiUrl) {
        throw new Error('Missing auth data');
    }

    return (
        <div className={styles.wrapper}>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    locale={locale}
                    shape="pill"
                    onSuccess={(response) => {
                        fetch(`${apiUrl}/authentication/google`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                token: response.credential,
                            }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                // eslint-disable-next-line no-console
                                console.log(data);
                            });
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
}
