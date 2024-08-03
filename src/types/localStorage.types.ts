export type TSetLocalStorageValue<T> = (
    newValue: T | null | ((prevValue: T | null) => T | null),
) => void;

export interface IUseLocalStorageResult<T> {
    localStorageValue: T | null;
    setLocalStorageValue: TSetLocalStorageValue<T | null>;
}
