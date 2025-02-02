'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    DEVICE_ID_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { TServerActionResponse } from 'types/apiClient.types';
import { EAppRoutes } from 'types/appRoutes';
import { getFailedResponse } from 'utils/failedResponse.utils';

export async function signOut(): TServerActionResponse {
    try {
        await Promise.all([
            setCookie({
                key: SESSION_COOKIE_NAME,
            }),
            setCookie({
                key: REFRESH_TOKEN_COOKIE_NAME,
            }),
            setCookie({
                key: DEVICE_ID_COOKIE_NAME,
            }),
        ]);
    } catch (error) {
        return getFailedResponse(error, 'failed to sign out');
    }

    return redirect(EAppRoutes.Auth);
}
