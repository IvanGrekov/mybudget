'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TServerActionResponse } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { GoogleIdTokenDto } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

const ERROR_LOG_DESCRIPTION = 'failed to sign in with google';

export async function googleSignIn(
    dto: GoogleIdTokenDto,
): TServerActionResponse {
    try {
        const result = await makeApiFetch({
            url: '/authentication/google',
            method: 'POST',
            body: dto,
        });
        const data = await result.json();

        if (!result.ok) {
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
