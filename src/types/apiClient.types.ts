export type TApiClientResult<T> = Promise<{
    data: null | T;
    error: null | string;
}>;
