'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    DEVICE_ID_COOKIE_NAME,
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TServerActionResponse } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

const ERROR_LOG_DESCRIPTION = 'failed to sign in with google';

export async function googleSignIn(token: string): TServerActionResponse {
    try {
        const deviceId = cookies().get(DEVICE_ID_COOKIE_NAME)?.value;

        if (!deviceId) {
            return getFailedResponse(
                ERROR_LOG_DESCRIPTION,
                'Device ID cookie is not set',
            );
        }

        const response = await makeApiFetch({
            url: '/authentication/google',
            method: 'POST',
            body: { token, deviceId },
        });
        const data = await response.json();

        if (!response.ok) {
            return getFailedResponse(data, ERROR_LOG_DESCRIPTION);
        }

        await Promise.all([
            setCookie({
                key: SESSION_COOKIE_NAME,
                value: data.accessToken,
            }),
            setCookie({
                key: REFRESH_TOKEN_COOKIE_NAME,
                value: data.refreshToken,
                httpOnly: true,
            }),
        ]);
    } catch (error) {
        return getFailedResponse(error, ERROR_LOG_DESCRIPTION);
    }

    return redirect(EAppRoutes.Root);
}
