import {
    useState,
    useRef,
    useEffect,
    cloneElement,
    Children,
    FunctionComponentElement,
    MutableRefObject,
} from 'react';

import { ITooltipProps } from 'components/tooltip/types/tooltipProps';

type TChild = HTMLElement | null;
type TChildWithRef = MutableRefObject<TChild> | null;
type TUseTooltip = (args: {
    children: ITooltipProps['children'];
    open?: boolean;
    openDelay?: number;
}) => {
    isOpen: boolean;
    childWithRef: FunctionComponentElement<{
        ref: MutableRefObject<TChildWithRef>;
    }>;
    tooltipTextRef: MutableRefObject<HTMLDivElement | null>;
};

export const useTooltip: TUseTooltip = ({ children, open, openDelay }) => {
    const [isOpen, setIsOpen] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const childRef = useRef<TChildWithRef>(null);
    const childWithRef = cloneElement(Children.only(children), {
        ref: childRef,
    });

    const tooltipTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) {
            setIsOpen(false);
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const child = childRef.current as unknown as TChild;
        const tooltipText = tooltipTextRef.current;

        if (!child || !tooltipText) {
            return;
        }

        const openTooltip = (): void => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (openDelay) {
                timeoutRef.current = setTimeout(() => {
                    setIsOpen(true);
                }, openDelay);
            } else {
                setIsOpen(true);
            }
        };

        const closeTooltip = (): void => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, 100);
        };

        const onClick = (): void => {
            child.blur();
        };

        tooltipText.addEventListener('mouseenter', openTooltip);
        tooltipText.addEventListener('mouseleave', closeTooltip);

        child.addEventListener('mouseenter', openTooltip);
        child.addEventListener('mouseleave', closeTooltip);
        child.addEventListener('focus', openTooltip);
        child.addEventListener('blur', closeTooltip);
        child.addEventListener('click', onClick);

        return (): void => {
            tooltipText.removeEventListener('mouseenter', openTooltip);
            tooltipText.removeEventListener('mouseleave', closeTooltip);

            child.removeEventListener('mouseenter', openTooltip);
            child.removeEventListener('mouseleave', closeTooltip);
            child.removeEventListener('focus', openTooltip);
            child.removeEventListener('blur', closeTooltip);
            child.removeEventListener('click', onClick);
        };
    }, [open, openDelay]);

    return {
        isOpen,
        childWithRef,
        tooltipTextRef,
    };
};
