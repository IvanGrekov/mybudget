'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { ApiClient } from 'models/apiClient';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { SignInDto } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

type TSignInResponse = null | { shouldPassTfa?: boolean; error?: string };

export async function signIn(
    signInDto: SignInDto,
): TAsyncApiClientResult<TSignInResponse> {
    const result = await fetch(`${ApiClient.baseUrl}/authentication/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInDto),
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

    const isUnauthorized = result.statusText.toLowerCase() === 'unauthorized';
    const isTfaRequired = data?.['cause'].toLowerCase().includes('two-factor');

    if (isUnauthorized && isTfaRequired && !signInDto.tfaToken) {
        return { shouldPassTfa: true };
    }

    return { error: getFailedResponseMessage(data) };
}
