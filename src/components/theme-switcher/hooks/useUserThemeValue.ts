import { useLayoutEffect, useRef } from 'react';

import { getUserTheme } from 'components/theme-switcher/utils/getUserTheme';
import { setUserThemeCookie } from 'components/theme-switcher/utils/setUserThemeCookie';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { IUseLocalStorageResult } from 'types/localStorage.types';
import { ETheme } from 'types/theme';

interface IUseUserThemeValueResult {
    value: IUseLocalStorageResult<ETheme>['localStorageValue'];
    toggleValue: VoidFunction;
}

export const useUserThemeValue = (): IUseUserThemeValueResult | null => {
    const root = useRef(window.document.documentElement);
    const {
        isMounted,
        localStorageValue: value,
        setLocalStorageValue,
    } = useLocalStorage({
        key: 'theme',
        getInitialValue: getUserTheme,
    });

    useLayoutEffect(() => {
        const isDark = value === ETheme.DARK;

        if (isDark) {
            root.current.classList.add(ETheme.DARK);
        } else {
            root.current.classList.remove(ETheme.DARK);
        }

        if (isMounted) {
            setUserThemeCookie(isDark ? ETheme.DARK : ETheme.LIGHT);
        }
    }, [value, isMounted]);

    const toggleValue = (): void => {
        setLocalStorageValue((prevValue) =>
            prevValue === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT,
        );
    };

    return isMounted
        ? {
              value,
              toggleValue,
          }
        : null;
};
