import { Maybe } from 'types/utility.types';

export type TAsyncApiClientResult<T> = Promise<Maybe<T>>;

export interface IFailedResponse {
    error: string;
    cause?: string;
}

export type TServerActionResponse<T = void> = Promise<
    Maybe<T> | IFailedResponse
>;
