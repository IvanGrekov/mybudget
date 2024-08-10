import createMiddleware from 'next-intl/middleware';

import {
    LOCALES as locales,
    DEFAULT_LOCALE as defaultLocale,
} from 'constants/locales';

export default createMiddleware({
    locales,
    defaultLocale,
});

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/([a-z]+)/:path*'],
};
