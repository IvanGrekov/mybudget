import { useEffect, RefObject } from 'react';

type TUseInputLabelEnterKeyHandler = (
    labelRef: RefObject<HTMLLabelElement>,
) => void;

export const useInputLabelEnterKeyHandler: TUseInputLabelEnterKeyHandler = (
    labelRef,
) => {
    useEffect(() => {
        const onKeydown = (event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                labelRef.current?.click();
            }
        };

        const label = labelRef.current;
        label?.addEventListener('keydown', onKeydown);

        return (): void => {
            label?.removeEventListener('keydown', onKeydown);
        };
    }, [labelRef]);
};
