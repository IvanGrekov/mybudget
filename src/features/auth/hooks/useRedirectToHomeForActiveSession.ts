import { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
import { EAppRoutes } from 'types/appRoutes';
import { getCookie } from 'utils/getCookie';
import { getIsAuthPage } from 'utils/getIsAuthPage';

export const useRedirectToHomeForActiveSession = (): { isLoading: boolean } => {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        if (!getIsAuthPage(pathname) || !getCookie(SESSION_COOKIE_NAME)) {
            return setIsLoading(false);
        }

        window.location.href = EAppRoutes.Root;
    }, [pathname]);

    return { isLoading };
};
