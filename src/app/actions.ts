'use server';

import { cookies } from 'next/headers';

export async function deleteCookie(key: string): Promise<void> {
    'use server';

    cookies().delete(key);
}

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
    'use server';

    cookies().set({
        name: key,
        value,
        maxAge,
        path: '/',
    });
}
