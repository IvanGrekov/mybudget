import { useLayoutEffect } from 'react';

import { lockBodyScroll, unlockBodyScroll } from 'utils/scroll.utils';

export const useBodyScrollLock = (isLocked: boolean): void => {
    useLayoutEffect(() => {
        if (isLocked) {
            lockBodyScroll();
        } else {
            unlockBodyScroll();
        }
    }, [isLocked]);
};
