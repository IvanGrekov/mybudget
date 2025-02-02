import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import {
    COOKIES_ACCEPTED_STORAGE_KEY,
    COOKIES_NEXT_LOCALE_KEY,
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    DEVICE_ID_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import {
    DEVICE_ID_OPTIONS,
    ACCESS_TOKEN_OPTIONS,
    REFRESH_TOKEN_OPTIONS,
} from 'constants/cookiesOptions.constants';
import { URL_HEADER } from 'constants/headers';
import {
    LOCALES as locales,
    PRIMARY_LOCALE as defaultLocale,
} from 'constants/locales';
import { EAppRoutes } from 'types/appRoutes';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getIsAuthPage } from 'utils/getIsAuthPage';
import { getIsAuthenticated } from 'utils/getIsAuthenticated';
import { getRefreshedTokens } from 'utils/getRefreshedTokens';
import log from 'utils/log';

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

    const deviceId = setDeviceIdCookie(request, response);

    const refreshTokensResponse = await refreshTokens({
        request,
        response,
        deviceId,
    });
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

function setDeviceIdCookie(
    request: NextRequest,
    response: NextResponse,
): string {
    const { cookies } = request;

    let deviceId = cookies.get(DEVICE_ID_COOKIE_NAME)?.value;

    if (!deviceId) {
        deviceId = crypto.randomUUID();

        response.cookies.set(
            DEVICE_ID_COOKIE_NAME,
            deviceId,
            DEVICE_ID_OPTIONS,
        );
    }

    return deviceId;
}

async function refreshTokens({
    request,
    response,
    deviceId,
}: {
    request: NextRequest;
    response: NextResponse;
    deviceId: string;
}): Promise<NextResponse | void> {
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

    const tokensResponse = await getRefreshedTokens(
        refreshToken,
        deviceId,
    ).catch((e) => {
        return getFailedResponse(e);
    });

    if ('error' in tokensResponse) {
        log('token refreshing failed', tokensResponse);

        return NextResponse.redirect(new URL(EAppRoutes.Auth, url));
    }

    const data = await tokensResponse.json();

    if (!tokensResponse.ok) {
        getFailedResponse(data, 'token refreshing failed');

        return NextResponse.redirect(new URL(EAppRoutes.Auth, url));
    }

    response.cookies.set(
        SESSION_COOKIE_NAME,
        data.accessToken,
        ACCESS_TOKEN_OPTIONS,
    );
    response.cookies.set(
        REFRESH_TOKEN_COOKIE_NAME,
        data.refreshToken,
        REFRESH_TOKEN_OPTIONS,
    );

    log('refreshing in middleware', {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    });
}

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
        '/',
        '/([a-z]+)/:path*',
    ],
};
