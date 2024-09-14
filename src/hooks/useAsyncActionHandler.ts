import { useState } from 'react';

import { TApiClientResult } from 'types/apiClient.types';

interface IUseAsyncActionHandlerArgs<T, R> {
    action: (data: T) => TApiClientResult<R>;
    onCompleted?: VoidFunction;
    onError?: (error: Error) => void;
}

type TAsyncActionHandler<T, R> = (data: T) => TApiClientResult<R>;

interface IUseAsyncActionHandlerResult<T, R> {
    isLoading: boolean;
    asyncActionHandler: TAsyncActionHandler<T, R>;
}

export const useAsyncActionHandler = <T, R>({
    action,
    onCompleted,
    onError,
}: IUseAsyncActionHandlerArgs<T, R>): IUseAsyncActionHandlerResult<T, R> => {
    const [isLoading, setIsLoading] = useState(false);

    const asyncActionHandler: TAsyncActionHandler<T, R> = async (...args) => {
        try {
            setIsLoading(true);
            const result = await action(...args);

            if (onCompleted) {
                onCompleted();
            }

            return result;
        } catch (error) {
            if (onError) {
                onError(error);
            }

            return {
                data: null,
                error,
            };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        asyncActionHandler,
    };
};
