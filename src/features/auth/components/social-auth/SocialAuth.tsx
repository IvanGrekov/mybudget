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
    const addErrorMessage = useAddErrorMessageToNotifications();

    const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

    if (!clientId) {
        throw new Error('Missing auth data');
    }

    const onSuccess = (response: CredentialResponse): void => {
        const token = response.credential;
        if (!token) {
            return addErrorMessage('Failed to sign in with Google');
        }

        googleSignIn(token).then((data) => {
            if (data?.error) {
                addErrorMessage(data.error);
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
