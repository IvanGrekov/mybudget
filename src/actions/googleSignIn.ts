'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { ApiClient } from 'models/apiClient';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { GoogleIdTokenDto } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

type TGoogleSignInResponse = null | { error?: string };

export async function googleSignIn(
    dto: GoogleIdTokenDto,
): TAsyncApiClientResult<TGoogleSignInResponse> {
    const result = await fetch(`${ApiClient.baseUrl}/authentication/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    });
    const data = await result.json();
    const isOkStatus = result.ok;

    if (isOkStatus) {
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

        return redirect(EAppRoutes.Root);
    }

    return { error: getFailedResponseMessage(data) };
}
