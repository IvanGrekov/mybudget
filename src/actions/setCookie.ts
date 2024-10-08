'use server';

import { cookies } from 'next/headers';

interface ISetCookieArgs {
    key: string;
    value: string;
    maxAge?: number;
    httpOnly?: boolean;
}

export async function setCookie({
    key,
    value,
    // NOTE: Default expiration time is 1 year
    maxAge = 60 * 60 * 24 * 365,
    httpOnly,
}: ISetCookieArgs): Promise<void> {
    cookies().set({
        name: key,
        value,
        maxAge,
        httpOnly: httpOnly,
        expires: new Date(Date.now() + maxAge),
        path: '/',
    });
}
