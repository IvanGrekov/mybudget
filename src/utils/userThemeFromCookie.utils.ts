import { cookies } from 'next/headers';

import { COOKIES_USER_THEME_KEY } from 'constants/cookiesKeys.constants';
import { ETheme } from 'types/theme';
import { getCookie } from 'utils/getCookie';

export const getUserThemeFromCookie = (): ETheme | undefined => {
    const storedThemeCookie = getCookie(COOKIES_USER_THEME_KEY);

    if (storedThemeCookie) {
        return storedThemeCookie as ETheme;
    }

    return undefined;
};

export const getIsDarkUserThemeFromCookie = (
    cookiesStore?: ReturnType<typeof cookies>,
): boolean => {
    let storedThemeCookie: string | undefined;

    if (cookiesStore) {
        storedThemeCookie = cookiesStore.get(COOKIES_USER_THEME_KEY)?.value;
    } else {
        storedThemeCookie = getUserThemeFromCookie();
    }

    return storedThemeCookie === ETheme.DARK;
};
