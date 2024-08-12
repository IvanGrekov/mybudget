'use server';

import { cookies } from 'next/headers';

interface ISetCookieArgs {
    key: string;
    value: string;
    maxAge?: number;
}

export async function setCookie({
    key,
    value,
    // NOTE: Default expiration time is 1 year
    maxAge = 60 * 60 * 24 * 365,
}: ISetCookieArgs): Promise<void> {
    cookies().set({
        name: key,
        value,
        maxAge,
        expires: new Date(Date.now() + maxAge),
        path: '/',
    });
}
