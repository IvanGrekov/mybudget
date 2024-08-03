import { useState, useEffect, useMemo } from 'react';

import { SCREEN_SIZE_NUMBERS } from 'constants/screenSizeNumbers';
import { EScreenSizeNames } from 'types/screenSizeNames';
import { getWindowWidth } from 'utils/windowSize.utils';

export const useWindowSize = (): EScreenSizeNames | null => {
    const [screenSize, setScreenSize] = useState<number | null>(null);

    useEffect(() => {
        const listener = (): void => {
            setScreenSize(getWindowWidth());
        };

        window.addEventListener('resize', listener);
        listener();

        return (): void => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    return useMemo(() => {
        if (screenSize === null) {
            return null;
        }

        for (const screenSizeKey of Object.keys(EScreenSizeNames)) {
            const key = screenSizeKey as keyof typeof EScreenSizeNames;

            if (screenSize <= SCREEN_SIZE_NUMBERS[key]) {
                return EScreenSizeNames[key];
            }
        }

        return EScreenSizeNames.XL;
    }, [screenSize]);
};
