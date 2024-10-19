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

export const DEFAULT_COOKIE_SAME_SITE = 'strict';

export const DEFAULT_COOKIE_PATH = '/';
