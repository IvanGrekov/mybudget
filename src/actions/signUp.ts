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
import { CreateUserDto } from 'types/generated.types';

type TSignUpResponse = null | { error?: string };

export async function signUp(
    signUpDto: CreateUserDto,
): TAsyncApiClientResult<TSignUpResponse> {
    try {
        const tokens = await MyBudgetApi.createUser(signUpDto);

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
