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

export const useLocalStorage = <T>({
    key,
    getInitialValue,
}: IUseLocalStorageArgs<T>): IUseLocalStorageResult<T> => {
    const [value, setValue] = useState<T | null>(null);

    useLayoutEffect(() => {
        setValue(
            getLocalStorageValue({
                key,
                initialValue: getInitialValue?.() || null,
            }),
        );
    }, [key, getInitialValue]);

    const setLocalStorageValue = useGetSetLocalStorageValue<T | null>({
        key,
        setValue,
    });

    return {
        localStorageValue: value,
        setLocalStorageValue,
    };
};
