import {
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
    useLayoutEffect,
} from 'react';

import {
    IUseLocalStorageResult,
    TSetLocalStorageValue,
} from 'types/localStorage.types';
import {
    setLocalStorageValue,
    getLocalStorageValue,
} from 'utils/localStorage.utils';

interface IUseGetSetLocalStorageValueArgs<T> {
    key: string;
    setValue: Dispatch<SetStateAction<T | null>>;
}

const useGetSetLocalStorageValue = <T>({
    key,
    setValue,
}: IUseGetSetLocalStorageValueArgs<T>): TSetLocalStorageValue<T> => {
    return useCallback(
        (newValue) => {
            setValue((prevValue) => {
                const valueToSave =
                    newValue instanceof Function
                        ? newValue(prevValue)
                        : newValue;

                setLocalStorageValue({
                    key,
                    value: valueToSave,
                });

                return valueToSave;
            });
        },
        [key, setValue],
    );
};

interface IUseLocalStorageArgs<T> {
    key: string;
    getInitialValue?: () => T;
}

interface IUseLocalStorageHookResult<T> extends IUseLocalStorageResult<T> {
    isMounted: boolean;
}

export const useLocalStorage = <T>({
    key,
    getInitialValue,
}: IUseLocalStorageArgs<T>): IUseLocalStorageHookResult<T> => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [value, setValue] = useState<T | null>(null);

    useLayoutEffect(() => {
        setValue(
            getLocalStorageValue({
                key,
                initialValue: getInitialValue?.() || null,
            }),
        );
        setIsMounted(true);
    }, [key, getInitialValue]);

    const setLocalStorageValue = useGetSetLocalStorageValue<T | null>({
        key,
        setValue,
    });

    return {
        isMounted,
        localStorageValue: value,
        setLocalStorageValue,
    };
};
