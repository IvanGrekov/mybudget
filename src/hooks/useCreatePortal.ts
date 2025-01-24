import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TUseCreatePortal = (args: {
    selector: string;
    shouldHide?: boolean;
    content: JSX.Element;
}) => () => JSX.Element | null;

export const useCreatePortal: TUseCreatePortal = ({
    selector,
    shouldHide,
    content,
}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) {
            throw new Error(`Element with selector ${selector} not found`);
        }
        ref.current = element;
        setMounted(true);
    }, [selector]);

    return () => {
        if (shouldHide || !mounted || !ref.current) {
            return null;
        }

        return createPortal(content, ref.current);
    };
};
