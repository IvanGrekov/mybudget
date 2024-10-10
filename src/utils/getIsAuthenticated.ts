import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';

export const getIsAuthenticated = (cookies: RequestCookies): boolean => {
    const generatedTokens = JSON.parse(
        cookies.get(SESSION_COOKIE_NAME)?.value || '{}',
    );

    if (!generatedTokens?.accessToken || !generatedTokens?.refreshToken) {
        return false;
    }

    return true;
};
