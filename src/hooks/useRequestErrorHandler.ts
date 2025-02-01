import { useEffect } from 'react';

import { useAddErrorMessageToNotifications } from 'hooks/notifications.hooks';

export const useRequestErrorHandler = (error: Error | null): void => {
    const addErrorMessage = useAddErrorMessageToNotifications();

    useEffect(() => {
        if (!error) {
            return;
        }

        addErrorMessage(error.message);
    }, [error, addErrorMessage]);
};
