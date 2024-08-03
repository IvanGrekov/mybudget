import { useRef, useState, useLayoutEffect } from 'react';

import { getIsBodyScrollLocked } from 'utils/scroll.utils';

export const useIsHeaderFixed = (): { isFixed: boolean } => {
    const prevScrollYRef = useRef(0);
    const [isFixed, setIsFixed] = useState(false);

    useLayoutEffect(() => {
        const scrollHandler = (): void => {
            const { scrollY } = window;
            const isScrollDown = scrollY > prevScrollYRef.current;
            const isScrollLocked = getIsBodyScrollLocked();

            if (scrollY > 20 && isScrollDown) {
                setIsFixed(true);
            }

            if (scrollY < 20 && !isScrollDown && !isScrollLocked) {
                setIsFixed(false);
            }

            prevScrollYRef.current = scrollY;
        };

        window.addEventListener('scroll', scrollHandler);

        return (): void => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return { isFixed };
};
