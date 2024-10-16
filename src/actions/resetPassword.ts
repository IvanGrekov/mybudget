'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { MyBudgetApi } from 'models/myBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { ResetPasswordDto } from 'types/generated.types';

type TResetPasswordResponse = null | { error?: string };

export async function resetPassword(
    resetPasswordDto: ResetPasswordDto,
): TAsyncApiClientResult<TResetPasswordResponse> {
    try {
        const tokens = await MyBudgetApi.resetPassword(resetPasswordDto);

        if (!tokens) {
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
