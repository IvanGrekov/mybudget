import { useRef, useLayoutEffect } from 'react';

import { lockBodyScroll, unlockBodyScroll } from 'utils/scroll.utils';

export const useBodyScrollLock = (isLocked: boolean): void => {
    const prevState = useRef(isLocked);

    useLayoutEffect(() => {
        if (isLocked) {
            lockBodyScroll();
        } else if (prevState.current !== isLocked) {
            unlockBodyScroll();
        }

        prevState.current = isLocked;
    }, [isLocked]);
};
