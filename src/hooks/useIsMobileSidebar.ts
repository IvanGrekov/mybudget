import { MOBILE_SIDEBAR_SCREEN_SIZES } from 'constants/mobileSidebarScreenSizes';
import { useWindowSize } from 'hooks/useWindowSize';

export const useIsMobileSidebar = (): boolean | null => {
    const windowSize = useWindowSize();

    if (!windowSize) {
        return null;
    }

    return MOBILE_SIDEBAR_SCREEN_SIZES.includes(windowSize);
};
