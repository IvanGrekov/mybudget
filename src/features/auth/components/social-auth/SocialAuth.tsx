'use client';

import {
    GoogleLogin,
    GoogleOAuthProvider,
    CredentialResponse,
} from '@react-oauth/google';

import { googleSignIn } from 'actions/googleSignIn';
import styles from 'features/auth/components/social-auth/SocialAuth.module.scss';
import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';

interface ISocialAuthProps {
    locale: string;
}

export default function SocialAuth({ locale }: ISocialAuthProps): JSX.Element {
    const addErrorNotification = useAddErrorMessageToNotifications();

    const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!clientId || !apiUrl) {
        throw new Error('Missing auth data');
    }

    const onSuccess = (response: CredentialResponse): void => {
        const token = response.credential;
        if (!token) {
            return addErrorNotification({
                message: 'Failed to sign in with Google',
            });
        }
        googleSignIn({ token }).then((data) => {
            const error = data?.error;
            if (error) {
                addErrorNotification({
                    message: error,
                });
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    locale={locale}
                    shape="pill"
                    onSuccess={onSuccess}
                />
            </GoogleOAuthProvider>
        </div>
    );
}
