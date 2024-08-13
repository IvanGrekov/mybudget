import { ETheme } from 'types/theme';
import { getUserThemeFromCookie } from 'utils/userThemeFromCookie.utils';

export const getUserTheme = (): ETheme => {
    const storedThemeCookie = getUserThemeFromCookie();

    if (storedThemeCookie) {
        return storedThemeCookie;
    }

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return ETheme.LIGHT;
    }

    return ETheme.DARK;
};
