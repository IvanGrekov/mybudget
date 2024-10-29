import { MutableRefObject, Dispatch, SetStateAction, useEffect } from 'react';

import { BASE_ANIMATION_DURATION } from 'constants/animationDuration.constants';

type TUseInitIndicator = (args: {
    isDelayed?: boolean;
    indicatorElementRef: MutableRefObject<HTMLDivElement | null>;
    setIndicatorLeftPosition: Dispatch<SetStateAction<number | null>>;
}) => void;

export const useInitIndicator: TUseInitIndicator = ({
    isDelayed,
    indicatorElementRef,
    setIndicatorLeftPosition,
}) => {
    useEffect(() => {
        const resizeHandler = (): void => {
            const indicatorElementRect =
                indicatorElementRef.current?.getBoundingClientRect();

            if (indicatorElementRect) {
                setIndicatorLeftPosition(indicatorElementRect.left);
            }
        };

        const delay = isDelayed ? BASE_ANIMATION_DURATION * 0.85 : 0;
        const timeoutId = setTimeout(resizeHandler, delay);

        window.addEventListener('resize', resizeHandler);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', resizeHandler);
        };
    }, [isDelayed, indicatorElementRef, setIndicatorLeftPosition]);
};
