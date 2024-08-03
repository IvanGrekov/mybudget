import { useEffect } from 'react';

export const useEscapeListener = (onEscape: VoidFunction): void => {
    useEffect(() => {
        const onEscapeKeyDown = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                onEscape();
            }
        };

        document.body.addEventListener('keydown', onEscapeKeyDown);

        return (): void => {
            document.body.addEventListener('keydown', onEscapeKeyDown);
        };
    }, [onEscape]);
};
