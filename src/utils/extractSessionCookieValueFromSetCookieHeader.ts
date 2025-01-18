import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';

export const extractSessionCookieValueFromSetCookieHeader = (
    header: string | null,
): string | null => {
    if (!header) {
        return null;
    }

    const sessionCookie = header
        .split(';')
        .find((cookie) => cookie.includes(SESSION_COOKIE_NAME));

    if (!sessionCookie) {
        return null;
    }

    const [, sessionCookieValue] = sessionCookie.split('=');

    return sessionCookieValue;
};
