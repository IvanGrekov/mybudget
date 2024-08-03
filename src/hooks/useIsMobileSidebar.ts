import { MOBILE_SIDEBAR_SCREEN_SIZES } from 'constants/mobileSidebarScreenSizes';
import { useWindowSize } from 'hooks/useWindowSize';

export const useIsMobileSidebar = (): boolean => {
    const windowSize = useWindowSize();

    if (!windowSize) {
        return false;
    }

    return MOBILE_SIDEBAR_SCREEN_SIZES.includes(windowSize);
};
