'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import { SESSION_COOKIE_NAME } from 'constants/cookiesKeys.constants';
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

        await setCookie({
            key: SESSION_COOKIE_NAME,
            value: JSON.stringify(tokens),
            httpOnly: true,
        });
    } catch (error) {
        return { error: error.message };
    }

    return redirect(EAppRoutes.Root);
}
