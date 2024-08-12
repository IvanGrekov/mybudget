import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { COOKIES_ACCEPTED_STORAGE_KEY } from 'constants/cookiesAcceptedStorageKey';
import {
    LOCALES as locales,
    DEFAULT_LOCALE as defaultLocale,
} from 'constants/locales';

export default async function middleware(
    request: NextRequest,
): Promise<NextResponse> {
    const handleIntlRouting = createIntlMiddleware({
        locales,
        defaultLocale,
    });
    const response = handleIntlRouting(request);

    if (request.cookies.get(COOKIES_ACCEPTED_STORAGE_KEY)?.value !== 'true') {
        response.cookies.delete('NEXT_LOCALE');
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/([a-z]+)/:path*'],
};
