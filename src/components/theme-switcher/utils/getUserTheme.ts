import { ETheme } from 'types/theme';

export const getUserTheme = (): ETheme => {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return ETheme.LIGHT;
    }

    return ETheme.DARK;
};
