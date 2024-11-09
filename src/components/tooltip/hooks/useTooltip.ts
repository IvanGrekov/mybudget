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
type TUseTooltip = (children: ITooltipProps['children']) => {
    isOpen: boolean;
    childWithRef: FunctionComponentElement<{
        ref: MutableRefObject<TChildWithRef>;
    }>;
    tooltipTextRef: MutableRefObject<HTMLDivElement | null>;
};

export const useTooltip: TUseTooltip = (children) => {
    const [isOpen, setIsOpen] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const childRef = useRef<TChildWithRef>(null);
    const childWithRef = cloneElement(Children.only(children), {
        ref: childRef,
    });

    const tooltipTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const child = childRef.current as unknown as TChild;
        const tooltipText = tooltipTextRef.current;

        if (!child || !tooltipText) {
            return;
        }

        const open = (): void => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setIsOpen(true);
        };
        const close = (): void => {
            timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, 100);
        };
        const onClick = (): void => {
            child.blur();
        };

        tooltipText.addEventListener('mouseenter', open);
        tooltipText.addEventListener('mouseleave', close);

        child.addEventListener('mouseenter', open);
        child.addEventListener('mouseleave', close);
        child.addEventListener('focus', open);
        child.addEventListener('blur', close);
        child.addEventListener('click', onClick);

        return (): void => {
            tooltipText.removeEventListener('mouseenter', open);
            tooltipText.removeEventListener('mouseleave', close);

            child.removeEventListener('mouseenter', open);
            child.removeEventListener('mouseleave', close);
            child.removeEventListener('focus', open);
            child.removeEventListener('blur', close);
            child.removeEventListener('click', onClick);
        };
    }, []);

    return {
        isOpen,
        childWithRef,
        tooltipTextRef,
    };
};
