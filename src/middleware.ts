import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import {
    COOKIES_ACCEPTED_STORAGE_KEY,
    COOKIES_NEXT_LOCALE_KEY,
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import {
    SESSION_COOKIE_MAX_AGE,
    REFRESH_TOKEN_MAX_AGE,
    DEFAULT_COOKIE_SAME_SITE,
    DEFAULT_COOKIE_PATH,
} from 'constants/cookiesOptions.constants';
import { URL_HEADER } from 'constants/headers';
import {
    LOCALES as locales,
    PRIMARY_LOCALE as defaultLocale,
} from 'constants/locales';
import { EAppRoutes } from 'types/appRoutes';
import { getIsAuthPage } from 'utils/getIsAuthPage';
import { getIsAuthenticated } from 'utils/getIsAuthenticated';

export default async function middleware(
    request: NextRequest,
): Promise<NextResponse> {
    const response = await intl(request);

    cookiesAcceptedCheck(request, response);

    setUrlHeader(request, response);

    const authRedirectionsResponse = authRedirections(request);
    if (authRedirectionsResponse) {
        return authRedirectionsResponse;
    }

    const refreshTokensResponse = await refreshTokens(request, response);
    if (refreshTokensResponse) {
        return refreshTokensResponse;
    }

    return response;
}

function intl(request: NextRequest): NextResponse {
    const handleIntlRouting = createIntlMiddleware({
        locales,
        defaultLocale,
    });

    return handleIntlRouting(request);
}

function cookiesAcceptedCheck(
    request: NextRequest,
    response: NextResponse,
): void {
    if (request.cookies.get(COOKIES_ACCEPTED_STORAGE_KEY)?.value !== 'true') {
        response.cookies.delete(COOKIES_NEXT_LOCALE_KEY);
    }
}

function setUrlHeader(request: NextRequest, response: NextResponse): void {
    response.headers.set(URL_HEADER, request.url);
}

function authRedirections(request: NextRequest): NextResponse | void {
    const { cookies, url } = request;

    const isAuthPage = getIsAuthPage(url);
    const isAuthenticated = getIsAuthenticated(cookies);

    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL(EAppRoutes.Root, url));
    }
}

async function refreshTokens(
    request: NextRequest,
    response: NextResponse,
): Promise<NextResponse | void> {
    const { cookies, url } = request;

    const isAuthPage = getIsAuthPage(url);
    const accessToken = cookies.get(SESSION_COOKIE_NAME)?.value;
    const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    if (isAuthPage) {
        accessToken && response.cookies.delete(SESSION_COOKIE_NAME);
        refreshToken && response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);

        return;
    }

    if (accessToken) {
        return;
    }

    if (!refreshToken) {
        return NextResponse.redirect(new URL(EAppRoutes.Auth, url));
    }

    const tokensResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/refresh-token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken,
            }),
        },
    );
    const newTokensData = await tokensResponse.json();

    if (!tokensResponse.ok) {
        return NextResponse.redirect(new URL(EAppRoutes.Auth, url));
    }

    response.cookies.set(SESSION_COOKIE_NAME, newTokensData.accessToken, {
        maxAge: SESSION_COOKIE_MAX_AGE,
        sameSite: DEFAULT_COOKIE_SAME_SITE,
        path: DEFAULT_COOKIE_PATH,
    });
    response.cookies.set(
        REFRESH_TOKEN_COOKIE_NAME,
        newTokensData.refreshToken,
        {
            maxAge: REFRESH_TOKEN_MAX_AGE,
            httpOnly: true,
            sameSite: DEFAULT_COOKIE_SAME_SITE,
            path: DEFAULT_COOKIE_PATH,
        },
    );
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/([a-z]+)/:path*'],
};
