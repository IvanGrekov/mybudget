'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    DEVICE_ID_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
    COOKIES_NEXT_LOCALE_KEY,
} from 'constants/cookiesKeys.constants';
import { PRIMARY_LOCALE } from 'constants/locales';
import { TServerActionResponse } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { SignUpDto, SignUpDtoLanguageEnum } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

const ERROR_LOG_DESCRIPTION = 'failed to sign up';

export async function signUp(
    signUpDto: Pick<
        SignUpDto,
        'email' | 'password' | 'defaultCurrency' | 'timeZone' | 'nickname'
    >,
): TServerActionResponse {
    try {
        const cookiesStorage = cookies();

        const deviceId = cookiesStorage.get(DEVICE_ID_COOKIE_NAME)?.value;

        if (!deviceId) {
            return getFailedResponse(
                ERROR_LOG_DESCRIPTION,
                'Device ID cookie is not set',
            );
        }

        const locale = cookiesStorage.get(COOKIES_NEXT_LOCALE_KEY)?.value;
        const isPrimaryLocale = !locale || locale === PRIMARY_LOCALE;

        const response = await makeApiFetch({
            url: '/authentication/sign-up',
            method: 'POST',
            body: {
                ...signUpDto,
                deviceId,
                language: isPrimaryLocale
                    ? SignUpDtoLanguageEnum.EN
                    : SignUpDtoLanguageEnum.UA,
            },
        });
        const data = await response.json();

        if (!response.ok) {
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
