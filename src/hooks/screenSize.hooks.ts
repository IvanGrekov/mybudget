import { useWindowSize } from 'hooks/useWindowSize';
import { EScreenSizeNames } from 'types/screenSizeNames';

export const useIsScreenSize = (
    screenSize: EScreenSizeNames | EScreenSizeNames[],
): boolean => {
    const windowSize = useWindowSize();

    if (!windowSize) {
        return false;
    }

    if (Array.isArray(screenSize)) {
        return screenSize.includes(windowSize);
    }

    return windowSize === screenSize;
};

export const useIsMobile = (): boolean => {
    return useIsScreenSize([EScreenSizeNames.XS, EScreenSizeNames.SM]);
};

export const useIsTablet = (): boolean => {
    return useIsScreenSize([
        EScreenSizeNames.XS,
        EScreenSizeNames.SM,
        EScreenSizeNames.MD,
    ]);
};
