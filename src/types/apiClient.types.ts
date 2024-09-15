export type TApiClientResult<T> = null | T;

export type TAsyncApiClientResult<T> = Promise<TApiClientResult<T>>;
