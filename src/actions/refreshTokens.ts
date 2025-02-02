'use server';

import { cookies, headers } from 'next/headers';

import { setCookie } from 'actions/setCookie';
import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    DEVICE_ID_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TServerActionResponse } from 'types/apiClient.types';
import { extractDeviceIdCookieValueFromSetCookieHeader } from 'utils/extractDeviceIdCookieValueFromSetCookieHeader';
import { extractSessionCookieValueFromSetCookieHeader } from 'utils/extractSessionCookieValueFromSetCookieHeader';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { getRefreshedTokens } from 'utils/getRefreshedTokens';
import log from 'utils/log';

type TRefreshTokensResponse = TServerActionResponse<{
    accessToken: string;
    refreshToken?: string;
}>;

const ERROR_MESSAGE = 'token refreshing failed';

export async function refreshTokens(): TRefreshTokensResponse {
    try {
        const accessToken = cookies().get(SESSION_COOKIE_NAME)?.value;
        if (accessToken) {
            return { accessToken };
        }

        const setCookieHeader = headers().get('set-cookie');

        const accessTokenBySessionCookieValue =
            extractSessionCookieValueFromSetCookieHeader(setCookieHeader);
        if (accessTokenBySessionCookieValue) {
            return { accessToken: accessTokenBySessionCookieValue };
        }

        const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value;

        if (!refreshToken) {
            log(ERROR_MESSAGE, ': no refresh token found');

            return { error: 'No refresh token found' };
        }

        const deviceId =
            cookies().get(DEVICE_ID_COOKIE_NAME)?.value ||
            extractDeviceIdCookieValueFromSetCookieHeader(setCookieHeader);

        const response = await getRefreshedTokens(refreshToken, deviceId).catch(
            (e) => {
                return getFailedResponse(e);
            },
        );

        if ('error' in response) {
            log(ERROR_MESSAGE, response);

            return response;
        }

        const data = await response.json();

        if (!response.ok) {
            return getFailedResponse(data, ERROR_MESSAGE);
        }

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        await Promise.all([
            setCookie({
                key: SESSION_COOKIE_NAME,
                value: newAccessToken,
            }),
            setCookie({
                key: REFRESH_TOKEN_COOKIE_NAME,
                value: newRefreshToken,
                httpOnly: true,
            }),
        ]);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        return getFailedResponse(error, ERROR_MESSAGE);
    }
}
