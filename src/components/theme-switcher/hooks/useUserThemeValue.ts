import { useLayoutEffect } from 'react';

import { getUserTheme } from 'components/theme-switcher/utils/getUserTheme';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { IUseLocalStorageResult } from 'types/localStorage.types';
import { ETheme } from 'types/theme';

export const useUserThemeValue = (): IUseLocalStorageResult<ETheme> | null => {
    const { isMounted, localStorageValue, setLocalStorageValue } =
        useLocalStorage({
            key: 'theme',
            getInitialValue: getUserTheme,
        });

    // TODO: keep theme in cookies (IG)

    useLayoutEffect(() => {
        const root = window.document.documentElement;

        if (localStorageValue === ETheme.DARK) {
            root.classList.add(ETheme.DARK);
        } else {
            root.classList.remove(ETheme.DARK);
        }
    }, [localStorageValue]);

    return isMounted
        ? {
              localStorageValue,
              setLocalStorageValue,
          }
        : null;
};
