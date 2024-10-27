import { useEffect, RefObject } from 'react';

interface IUseNativeSelectRefCallbackArgs {
    inputRef: RefObject<HTMLInputElement>;
    nativeSelectRefCallback?: (ref: HTMLInputElement) => void;
}

export const useNativeSelectRefCallback = ({
    inputRef,
    nativeSelectRefCallback,
}: IUseNativeSelectRefCallbackArgs): void => {
    useEffect(() => {
        if (nativeSelectRefCallback && inputRef.current) {
            nativeSelectRefCallback(inputRef.current);
        }
    }, [inputRef, nativeSelectRefCallback]);
};
