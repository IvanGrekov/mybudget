import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TUseCreatePortal = (args: {
    selector: string;
    content: JSX.Element;
}) => () => JSX.Element | null;

export const useCreatePortal: TUseCreatePortal = ({ selector, content }) => {
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
        return mounted && ref.current
            ? createPortal(content, ref.current)
            : null;
    };
};
