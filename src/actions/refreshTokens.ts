'use server';

import { cookies, headers } from 'next/headers';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TServerActionResponse } from 'types/apiClient.types';
import { extractSessionCookieValueFromSetCookieHeader } from 'utils/extractSessionCookieValueFromSetCookieHeader';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getRefreshedTokens } from 'utils/getRefreshedTokens';
import log from 'utils/log';

type TRefreshTokensResponse = TServerActionResponse<{
    accessToken?: string;
}>;

const ERROR_MESSAGE = 'token refreshing failed';

export async function refreshTokens(): TRefreshTokensResponse {
    try {
        const accessToken = cookies().get(SESSION_COOKIE_NAME)?.value;
        if (accessToken) {
            return { accessToken };
        }

        const accessTokenBySessionCookieValue =
            extractSessionCookieValueFromSetCookieHeader(
                headers().get('set-cookie'),
            );
        if (accessTokenBySessionCookieValue) {
            return { accessToken: accessTokenBySessionCookieValue };
        }

        const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value;

        if (!refreshToken) {
            log(ERROR_MESSAGE, ': no refresh token found');

            return { error: 'No refresh token found' };
        }

        const tokensResponse = await getRefreshedTokens(refreshToken).catch(
            (e) => {
                return getFailedResponse(e);
            },
        );

        if ('error' in tokensResponse) {
            log(ERROR_MESSAGE, tokensResponse);

            return tokensResponse;
        }

        if (!tokensResponse.ok) {
            return getFailedResponse({ ...tokensResponse }, ERROR_MESSAGE);
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
        return getFailedResponse(error, ERROR_MESSAGE);
    }
}
