'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { ResetPasswordDto } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';
import { makeApiFetch } from 'utils/makeApiFetch';

type TResetPasswordResponse = null | { error?: string };

export async function resetPassword(
    resetPasswordDto: ResetPasswordDto,
): TAsyncApiClientResult<TResetPasswordResponse> {
    try {
        const result = await makeApiFetch({
            url: '/authentication/reset-password',
            method: 'POST',
            body: resetPasswordDto,
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
