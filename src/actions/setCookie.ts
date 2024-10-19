'use server';

import { cookies } from 'next/headers';

import {
    SESSION_COOKIE_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
} from 'constants/cookiesKeys.constants';
import {
    DEFAULT_COOKIE_MAX_AGE,
    SESSION_COOKIE_MAX_AGE,
    REFRESH_TOKEN_MAX_AGE,
    DEFAULT_COOKIE_SAME_SITE,
    DEFAULT_COOKIE_PATH,
} from 'constants/cookiesOptions.constants';

interface ISetCookieArgs {
    key: string;
    value?: string;
    maxAge?: number;
    httpOnly?: boolean;
}

export async function setCookie({
    key,
    value,
    // NOTE: Default expiration time is 1 year
    maxAge = calculateMaxAge(key),
    httpOnly,
}: ISetCookieArgs): Promise<void> {
    if (!value) {
        cookies().delete(key);
    } else {
        cookies().set({
            name: key,
            value,
            maxAge,
            httpOnly: httpOnly,
            sameSite: DEFAULT_COOKIE_SAME_SITE,
            path: DEFAULT_COOKIE_PATH,
        });
    }
}

function calculateMaxAge(key: string): number {
    switch (key) {
        case SESSION_COOKIE_NAME:
            return SESSION_COOKIE_MAX_AGE;
        case REFRESH_TOKEN_COOKIE_NAME:
            return REFRESH_TOKEN_MAX_AGE;
        default:
            return DEFAULT_COOKIE_MAX_AGE;
    }
}
