'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { SignInDto } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';
import { makeApiFetch } from 'utils/makeApiFetch';

type TSignInResponse = null | { shouldPassTfa?: boolean; error?: string };

export async function signIn(
    signInDto: SignInDto,
): TAsyncApiClientResult<TSignInResponse> {
    try {
        const result = await makeApiFetch({
            url: '/authentication/sign-in',
            method: 'POST',
            body: signInDto,
        });
        const data = await result.json();

        if (!result.ok) {
            const isUnauthorized =
                result.statusText.toLowerCase() === 'unauthorized';
            const isTfaRequired = data?.['cause']
                .toLowerCase()
                .includes('two-factor');

            if (isUnauthorized && isTfaRequired && !signInDto.tfaToken) {
                return { shouldPassTfa: true };
            }

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
