import { useLayoutEffect, useRef, useState, RefObject } from 'react';

type TUseContentHeight = (isOpen: boolean) => {
    childrenWrapperRef: RefObject<HTMLDivElement>;
    contentHeight: number;
};

export const useContentHeight: TUseContentHeight = (isOpen) => {
    const childrenWrapperRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useLayoutEffect(() => {
        if (!childrenWrapperRef.current) {
            return;
        }

        if (!isOpen) {
            setContentHeight(0);
        } else {
            const { height } =
                childrenWrapperRef.current.getBoundingClientRect();
            setContentHeight(height);
        }
    }, [isOpen]);

    return { childrenWrapperRef, contentHeight };
};
