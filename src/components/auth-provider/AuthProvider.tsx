import { PropsWithChildren } from 'react';

import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useRedirectToHomeForActiveSession } from 'features/auth/hooks/useRedirectToHomeForActiveSession';

export default function AuthProvider({
    children,
}: PropsWithChildren): JSX.Element {
    const { isLoading } = useRedirectToHomeForActiveSession();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
