import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import {
    COOKIES_ACCEPTED_STORAGE_KEY,
    COOKIES_NEXT_LOCALE_KEY,
} from 'constants/cookiesKeys.constants';
import { URL_HEADER } from 'constants/headers';
import {
    LOCALES as locales,
    PRIMARY_LOCALE as defaultLocale,
} from 'constants/locales';

export default async function middleware(
    request: NextRequest,
): Promise<NextResponse> {
    const handleIntlRouting = createIntlMiddleware({
        locales,
        defaultLocale,
    });

    const response = handleIntlRouting(request);

    const { cookies, url } = request;

    if (cookies.get(COOKIES_ACCEPTED_STORAGE_KEY)?.value !== 'true') {
        response.cookies.delete(COOKIES_NEXT_LOCALE_KEY);
    }

    response.headers.set(URL_HEADER, url);

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/([a-z]+)/:path*'],
};
