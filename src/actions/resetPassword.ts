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

type TResetPasswordResponse = null | { error?: string };

export async function resetPassword(
    resetPasswordDto: ResetPasswordDto,
): TAsyncApiClientResult<TResetPasswordResponse> {
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/authentication/reset-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetPasswordDto),
            },
        );
        const tokens = await result.json();

        if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
            return { error: 'Something went wrong' };
        }

        await Promise.all([
            setCookie({
                key: SESSION_COOKIE_NAME,
                value: tokens.accessToken,
            }),
            setCookie({
                key: REFRESH_TOKEN_COOKIE_NAME,
                value: tokens.refreshToken,
                httpOnly: true,
            }),
        ]);
    } catch (error) {
        return { error: error.message };
    }

    return redirect(EAppRoutes.Root);
}
