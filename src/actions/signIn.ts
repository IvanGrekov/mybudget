'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    DEVICE_ID_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TServerActionResponse } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { SignInDto } from 'types/generated.types';
import { getFailedResponse } from 'utils/failedResponse.utils';
import { makeApiFetch } from 'utils/makeApiFetch';

type TSignInResponse = TServerActionResponse<{
    shouldPassTfa?: boolean;
}>;

const ERROR_LOG_DESCRIPTION = 'failed to sign in';

export async function signIn(
    signInDto: Pick<SignInDto, 'email' | 'password' | 'tfaToken'>,
): TSignInResponse {
    try {
        const deviceId = cookies().get(DEVICE_ID_COOKIE_NAME)?.value;

        if (!deviceId) {
            return getFailedResponse(
                ERROR_LOG_DESCRIPTION,
                'Device ID cookie is not set',
            );
        }

        const response = await makeApiFetch({
            url: '/authentication/sign-in',
            method: 'POST',
            body: { ...signInDto, deviceId },
        });
        const data = await response.json();

        if (!response.ok) {
            const isUnauthorized =
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                response['statusText']?.toLowerCase() === 'unauthorized';
            const isTfaRequired = data?.['cause']
                ?.toLowerCase()
                .includes('two-factor');

            if (isUnauthorized && isTfaRequired && !signInDto.tfaToken) {
                return { shouldPassTfa: true };
            }

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
