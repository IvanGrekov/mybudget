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
import { TServerActionResponse } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import {
    CreateUserDto,
    CreateUserDtoLanguageEnum,
} from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

const ERROR_LOG_DESCRIPTION = 'failed to sign up';

export async function signUp(signUpDto: CreateUserDto): TServerActionResponse {
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
            return getFailedResponse(data, ERROR_LOG_DESCRIPTION);
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
        return getFailedResponse(error, ERROR_LOG_DESCRIPTION);
    }

    return redirect(EAppRoutes.Root);
}
