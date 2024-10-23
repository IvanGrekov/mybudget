import { useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { EAppRoutes } from 'types/appRoutes';
import { getCookie } from 'utils/getCookie';
import { getIsAuthPage } from 'utils/getIsAuthPage';

export const useRedirectToHomeForActiveSession = (): void => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!getIsAuthPage(pathname)) {
            return;
        }

        const sessionCookie = getCookie(SESSION_COOKIE_NAME);

        if (!sessionCookie) {
            return;
        }

        window.location.href = EAppRoutes.Root;
    }, [pathname, router]);
};
