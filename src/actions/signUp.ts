'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
    COOKIES_NEXT_LOCALE_KEY,
} from 'constants/cookiesKeys.constants';
import { PRIMARY_LOCALE } from 'constants/locales';
import { TAsyncApiClientResult } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import {
    CreateUserDto,
    CreateUserDtoLanguageEnum,
} from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';
import { makeApiFetch } from 'utils/makeApiFetch';

type TSignUpResponse = null | { error?: string };

export async function signUp(
    signUpDto: CreateUserDto,
): TAsyncApiClientResult<TSignUpResponse> {
    try {
        const cookiesStorage = cookies();
        const locale = cookiesStorage.get(COOKIES_NEXT_LOCALE_KEY)?.value;
        const isPrimaryLocale = !locale || locale === PRIMARY_LOCALE;

        const result = await makeApiFetch({
            url: '/authentication/sign-up',
            method: 'POST',
            body: {
                ...signUpDto,
                language: isPrimaryLocale
                    ? CreateUserDtoLanguageEnum.EN
                    : CreateUserDtoLanguageEnum.UA,
            },
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
