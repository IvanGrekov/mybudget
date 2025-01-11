import { Maybe } from 'types/utility.types';

export type TApiClientResult<T> = Maybe<T>;

export type TAsyncApiClientResult<T> = Promise<TApiClientResult<T>>;
