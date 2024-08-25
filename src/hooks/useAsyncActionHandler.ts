import { useState } from 'react';

interface IUseAsyncActionHandlerArgs<T, R> {
    onSubmit: (data: T) => R;
    onCompleted?: VoidFunction;
    onError?: (error: Error) => void;
}

type TAsyncActionHandler<T, R> = (data: T) => Promise<R | void>;

interface IUseAsyncActionHandlerResult<T, R> {
    isLoading: boolean;
    asyncActionHandler: TAsyncActionHandler<T, R>;
}

export const useAsyncActionHandler = <T, R>({
    onSubmit,
    onCompleted,
    onError,
}: IUseAsyncActionHandlerArgs<T, R>): IUseAsyncActionHandlerResult<T, R> => {
    const [isLoading, setIsLoading] = useState(false);

    const asyncActionHandler: TAsyncActionHandler<T, R> = async (...args) => {
        try {
            setIsLoading(true);
            const result = await onSubmit(...args);

            if (onCompleted) {
                onCompleted();
            }

            return result;
        } catch (error) {
            if (onError) {
                return onError(error);
            }

            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        asyncActionHandler,
    };
};
