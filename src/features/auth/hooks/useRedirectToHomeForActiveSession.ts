import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { EAppRoutes } from 'types/appRoutes';
import { getCookie } from 'utils/getCookie';

export const useRedirectToHomeForActiveSession = (): void => {
    const router = useRouter();

    useEffect(() => {
        const sessionCookie = getCookie(SESSION_COOKIE_NAME);

        // eslint-disable-next-line no-console
        console.log('sessionCookie', sessionCookie);

        if (sessionCookie) {
            router.replace(EAppRoutes.Root);
        }
    }, [router]);
};
