import { MutableRefObject, useState, useEffect } from 'react';

type TUseInitIndicator = (args: {
    indicatorElementRef: MutableRefObject<HTMLDivElement | null>;
}) => number | null;

export const useInitIndicator: TUseInitIndicator = ({
    indicatorElementRef,
}) => {
    const [indicatorLeftPosition, setIndicatorLeftPosition] = useState<
        null | number
    >(null);

    useEffect(() => {
        const resizeHandler = (): void => {
            const indicatorElementRect =
                indicatorElementRef.current?.getBoundingClientRect();

            if (indicatorElementRect) {
                setIndicatorLeftPosition(indicatorElementRect.left);
            }
        };

        resizeHandler();

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [indicatorElementRef, setIndicatorLeftPosition]);

    return indicatorLeftPosition;
};
