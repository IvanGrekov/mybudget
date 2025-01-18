'use server';

import { cookies, headers } from 'next/headers';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { extractSessionCookieValueFromSetCookieHeader } from 'utils/extractSessionCookieValueFromSetCookieHeader';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';
import { getRefreshedTokens } from 'utils/getRefreshedTokens';

type TRefreshTokensResponse = { error?: string; accessToken?: string };

const ERROR_MESSAGE = 'Token refreshing failed';

export async function refreshTokens(): TAsyncApiClientResult<TRefreshTokensResponse> {
    try {
        const accessToken = cookies().get(SESSION_COOKIE_NAME)?.value;
        if (accessToken) {
            // eslint-disable-next-line no-console
            console.log('refreshTokens: access token found');

            return { accessToken };
        }

        const sessionCookieValue = extractSessionCookieValueFromSetCookieHeader(
            headers().get('set-cookie'),
        );
        if (sessionCookieValue) {
            // eslint-disable-next-line no-console
            console.log('refreshTokens: session cookie value found');

            return { accessToken: sessionCookieValue };
        }

        const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value;

        if (!refreshToken) {
            // eslint-disable-next-line no-console
            console.warn('No refresh token found');

            return null;
        }

        // eslint-disable-next-line no-console
        console.log('refreshing in action', refreshToken);

        const tokensResponse = await getRefreshedTokens(refreshToken).catch(
            (e) => {
                // eslint-disable-next-line no-console
                console.error(`catch: ${ERROR_MESSAGE}:`, e);

                return null;
            },
        );

        if (!tokensResponse) {
            // eslint-disable-next-line no-console
            console.error(ERROR_MESSAGE, 'no tokens response');

            return null;
        }

        if (!tokensResponse.ok) {
            // eslint-disable-next-line no-console
            console.error(
                `not ok, ${ERROR_MESSAGE}:`,
                tokensResponse.statusText,
            );

            return null;
        }

        const newTokensData = await tokensResponse.json();
        const newAccessToken = newTokensData.accessToken;

        await Promise.all([
            setCookie({
                key: SESSION_COOKIE_NAME,
                value: newAccessToken,
            }),
            setCookie({
                key: REFRESH_TOKEN_COOKIE_NAME,
                value: newTokensData.refreshToken,
                httpOnly: true,
            }),
        ]);

        return { accessToken: newAccessToken };
    } catch (error) {
        return { error: getFailedResponseMessage(error) };
    }
}
