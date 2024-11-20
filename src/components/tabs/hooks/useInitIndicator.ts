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
        const updatePosition = (): void => {
            const indicatorElementRect =
                indicatorElementRef.current?.getBoundingClientRect();

            if (indicatorElementRect) {
                setIndicatorLeftPosition(indicatorElementRect.left);
            }
        };

        updatePosition();
    }, [indicatorElementRef]);

    return indicatorLeftPosition;
};
