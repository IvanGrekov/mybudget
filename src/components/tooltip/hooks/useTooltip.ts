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
};

export const useTooltip: TUseTooltip = (children) => {
    const [isOpen, setIsOpen] = useState(false);

    const childRef = useRef<TChildWithRef>(null);
    const childWithRef = cloneElement(Children.only(children), {
        ref: childRef,
    });

    useEffect(() => {
        const child = childRef.current as unknown as TChild;

        if (!child) {
            return;
        }

        const open = (): void => {
            setIsOpen(true);
        };
        const close = (): void => {
            setIsOpen(false);
        };
        const onClick = (): void => {
            child.blur();
        };

        child.addEventListener('mouseenter', open);
        child.addEventListener('mouseleave', close);
        child.addEventListener('focus', open);
        child.addEventListener('blur', close);
        child.addEventListener('click', onClick);

        return (): void => {
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
    };
};
