import { useRef, useEffect, useState, RefObject } from 'react';

interface IUseIsOverflowResult {
    containerRef: RefObject<HTMLDivElement>;
    isOverflow: boolean;
    isExpanded: boolean;
    toggleExpanding: VoidFunction;
}

export const useIsOverflow = (): IUseIsOverflowResult => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    useEffect(() => {
        const callback = (): void => {
            if (containerRef.current) {
                const overflowDifference =
                    containerRef.current.scrollHeight -
                    containerRef.current.clientHeight;

                setIsOverflow(overflowDifference > 0);
            }
        };

        callback();
        window.addEventListener('resize', callback);

        const observer = new MutationObserver(callback);
        if (containerRef.current) {
            observer.observe(containerRef.current, {
                childList: true,
                subtree: true,
            });
        }

        return () => {
            window.removeEventListener('resize', callback);
            observer.disconnect();
        };
    }, []);

    const toggleExpanding = (): void => {
        setIsExpanded((prev) => !prev);
    };

    return { containerRef, isOverflow, isExpanded, toggleExpanding };
};
