import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// NOTE: One year
export const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
// NOTE: One hour
export const SESSION_COOKIE_MAX_AGE = parseInt(
    process.env.NEXT_PUBLIC_SESSION_COOKIE_MAX_AGE || '3600',
    10,
);
// NOTE: One month
export const REFRESH_TOKEN_MAX_AGE = parseInt(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_MAX_AGE || '2592000',
    10,
);
// NOTE: One month
export const DEVICE_ID_MAX_AGE = parseInt(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_MAX_AGE || '2592000',
    10,
);

export const DEFAULT_COOKIE_SAME_SITE = 'lax';

export const DEFAULT_COOKIE_PATH = '/';

export const ACCESS_TOKEN_OPTIONS: Partial<ResponseCookie> = {
    maxAge: SESSION_COOKIE_MAX_AGE,
    sameSite: DEFAULT_COOKIE_SAME_SITE,
    path: DEFAULT_COOKIE_PATH,
};

export const REFRESH_TOKEN_OPTIONS: Partial<ResponseCookie> = {
    maxAge: REFRESH_TOKEN_MAX_AGE,
    httpOnly: true,
    sameSite: DEFAULT_COOKIE_SAME_SITE,
    path: DEFAULT_COOKIE_PATH,
};

export const DEVICE_ID_OPTIONS: Partial<ResponseCookie> = {
    maxAge: DEVICE_ID_MAX_AGE,
    sameSite: DEFAULT_COOKIE_SAME_SITE,
    path: DEFAULT_COOKIE_PATH,
};
