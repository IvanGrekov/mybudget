'use server';

import { redirect } from 'next/navigation';

import { setCookie } from 'actions/setCookie';
import {
    REFRESH_TOKEN_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import { EAppRoutes } from 'types/appRoutes';

export async function signOut(): Promise<void> {
    await Promise.all([
        setCookie({
            key: SESSION_COOKIE_NAME,
        }),
        setCookie({
            key: REFRESH_TOKEN_COOKIE_NAME,
        }),
    ]);

    return redirect(EAppRoutes.Auth);
}
