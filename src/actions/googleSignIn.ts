'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { GoogleIdTokenDto } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';
import { makeApiFetch } from 'utils/makeApiFetch';

type TGoogleSignInResponse = null | { error?: string };

export async function googleSignIn(
    dto: GoogleIdTokenDto,
): TAsyncApiClientResult<TGoogleSignInResponse> {
    try {
        const result = await makeApiFetch({
            url: '/authentication/google',
            method: 'POST',
            body: dto,
        });
        const data = await result.json();

        if (!result.ok) {
            return { error: getFailedResponseMessage(data) };
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
        return { error: getFailedResponseMessage(error) };
    }

    return redirect(EAppRoutes.Root);
}
