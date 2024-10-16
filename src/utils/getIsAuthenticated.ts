import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';

export const getIsAuthenticated = (cookies: RequestCookies): boolean => {
    const accessToken = cookies.get(SESSION_COOKIE_NAME)?.value;
    const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    if (!accessToken || !refreshToken) {
        return false;
    }

    return true;
};
