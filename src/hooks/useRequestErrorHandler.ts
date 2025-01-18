import { useEffect } from 'react';

import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';

export const useRequestErrorHandler = (
    error: Error | null,
    refetch?: VoidFunction,
): void => {
    const addErrorMessageToNotifications = useAddErrorMessageToNotifications();

    useEffect(() => {
        if (!error) {
            return;
        }

        addErrorMessageToNotifications({
            message: error.message,
        });
    }, [error, addErrorMessageToNotifications, refetch]);
};
