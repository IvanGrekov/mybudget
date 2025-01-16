import { useEffect, RefObject } from 'react';

interface IUseNativeSelectRefCallbackArgs<T> {
    inputRef: RefObject<T>;
    nativeSelectRefCallback?: (ref: T) => void;
}

export const useNativeSelectRefCallback = <T>({
    inputRef,
    nativeSelectRefCallback,
}: IUseNativeSelectRefCallbackArgs<T>): void => {
    useEffect(() => {
        if (nativeSelectRefCallback && inputRef.current) {
            nativeSelectRefCallback(inputRef.current);
        }
    }, [inputRef, nativeSelectRefCallback]);
};
