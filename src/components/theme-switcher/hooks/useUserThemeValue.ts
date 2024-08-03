import { useLayoutEffect } from 'react';

import { getUserTheme } from 'components/theme-switcher/utils/getUserTheme';
import { useLocalStorage } from 'hooks/localStorage.hooks';
import { IUseLocalStorageResult } from 'types/localStorage.types';
import { ETheme } from 'types/theme';

export const useUserThemeValue = (): IUseLocalStorageResult<ETheme> => {
    const { localStorageValue, setLocalStorageValue } = useLocalStorage({
        key: 'theme',
        getInitialValue: getUserTheme,
    });

    // TODO: keep theme in cookies (IG)

    useLayoutEffect(() => {
        const root = window.document.documentElement;

        if (localStorageValue === ETheme.DARK) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [localStorageValue]);

    return {
        localStorageValue,
        setLocalStorageValue,
    };
};
