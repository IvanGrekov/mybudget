import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import {
    COOKIES_ACCEPTED_STORAGE_KEY,
    COOKIES_NEXT_LOCALE_KEY,
} from 'constants/cookiesKeys.constants';
import {
    LOCALES as locales,
    PRIMARY_LOCALE as defaultLocale,
} from 'constants/locales';

export default async function middleware(
    request: NextRequest,
): Promise<NextResponse> {
    // eslint-disable-next-line no-console
    console.log('request.url', request.url);

    const handleIntlRouting = createIntlMiddleware({
        locales,
        defaultLocale,
    });
    const response = handleIntlRouting(request);

    if (request.cookies.get(COOKIES_ACCEPTED_STORAGE_KEY)?.value !== 'true') {
        response.cookies.delete(COOKIES_NEXT_LOCALE_KEY);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/([a-z]+)/:path*'],
};
