import log from 'utils/log';

interface IGetLocalStorageValueArgs<T> {
    key: string;
    initialValue?: T | null;
}

export const getLocalStorageValue = <T>({
    key,
    initialValue = null,
}: IGetLocalStorageValueArgs<T>): T | null => {
    try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        log(`Error reading key [${key}] from localStorage:`, error);

        return initialValue;
    }
};

interface ISetLocalStorageValueArgs<T> {
    key: string;
    value: T;
}

export const setLocalStorageValue = <T>({
    key,
    value,
}: ISetLocalStorageValueArgs<T>): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        log(`Error setting key [${key}] in localStorage:`, error);
    }
};
