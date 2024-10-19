'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { SERVER_MY_BUDGET_API } from 'models/serverMyBudgetApi';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { CreateUserDto } from 'types/generated.types';

type TSignUpResponse = null | { error?: string };

export async function signUp(
    signUpDto: CreateUserDto,
): TAsyncApiClientResult<TSignUpResponse> {
    try {
        const tokens = await SERVER_MY_BUDGET_API.createUser(signUpDto);

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
