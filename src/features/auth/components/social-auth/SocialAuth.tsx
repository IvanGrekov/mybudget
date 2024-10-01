'use client';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface ISocialAuthProps {
    locale: string;
}

export default function SocialAuth({ locale }: ISocialAuthProps): JSX.Element {
    const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

    if (!clientId) {
        throw new Error('Missing auth data');
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                locale={locale}
                onSuccess={(response) => {
                    fetch('http://localhost:3001/auth/google', {
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
    );
}
