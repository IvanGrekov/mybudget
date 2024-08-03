import { useState, useEffect } from 'react';

import { getIsScrollTopButtonVisible } from 'components/scroll-top-button/utils/getIsScrollTopButtonVisible';
import { scrollToTop } from 'components/scroll-top-button/utils/scrollToTop';

type TUseScrollTopButton = () => {
    isVisible: boolean;
    onClick: VoidFunction;
};

export const useScrollTopButton: TUseScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(getIsScrollTopButtonVisible());

        const onScroll = (): void => {
            setIsVisible(getIsScrollTopButtonVisible());
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return {
        isVisible,
        onClick: scrollToTop,
    };
};
