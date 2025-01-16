import { useEffect } from 'react';

import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';

export const useRequestErrorHandler = (error: Error | null): void => {
    const addErrorMessageToNotifications = useAddErrorMessageToNotifications();

    useEffect(() => {
        if (error) {
            addErrorMessageToNotifications({
                message: error.message,
            });
        }
    }, [error, addErrorMessageToNotifications]);
};
