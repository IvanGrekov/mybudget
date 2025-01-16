import { useEffect, useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
    NOTIFICATION_DISPLAY_DURATION,
    OFFLINE_NOTIFICATION_ID,
    NOTIFICATION_OFFLINE_NETWORK_STATUS_PRIORITY,
    NOTIFICATION_ONLINE_NETWORK_STATUS_PRIORITY,
} from 'constants/notifications.constants';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import { ENetworkStatus } from 'types/networkStatus';
import {
    INotification,
    ENotificationPriority,
    ENotificationType,
    TAddMessageToNotifications,
} from 'types/notificationsContext.types';

export const useAddErrorMessageToNotifications =
    (): TAddMessageToNotifications => {
        const context = useNotificationsContext();

        const { addNotification } = context;

        return (notificationArgs) => {
            addNotification({
                id: uuidv4(),
                type: ENotificationType.ERROR,
                ...notificationArgs,
            });
        };
    };

export const useAddInfoMessageToNotifications =
    (): TAddMessageToNotifications => {
        const context = useNotificationsContext();

        const { addNotification } = context;

        return (notificationArgs) => {
            addNotification({
                id: uuidv4(),
                type: ENotificationType.INFO,
                ...notificationArgs,
            });
        };
    };

export const useAddSuccessMessageToNotifications =
    (): TAddMessageToNotifications => {
        const context = useNotificationsContext();

        const { addNotification } = context;

        return (notificationArgs) => {
            addNotification({
                id: uuidv4(),
                type: ENotificationType.SUCCESS,
                ...notificationArgs,
            });
        };
    };

type TUseHandleNetworkError = (error: Error | null) => void;

export const useHandleNetworkError: TUseHandleNetworkError = (error) => {
    const addErrorMessageToNotifications = useAddErrorMessageToNotifications();

    useEffect(() => {
        if (error) {
            addErrorMessageToNotifications({
                message: `Network error: ${error.message}`,
                priority: ENotificationPriority.HIGH,
            });
        }
    }, [error, addErrorMessageToNotifications]);
};

type TUseAutoRemoveNotification = (
    args: Pick<INotification, 'id' | 'priority'>,
) => void;

export const useAutoRemoveNotification: TUseAutoRemoveNotification = ({
    id,
    priority,
}) => {
    const { notifications, setNotifications } = useNotificationsContext();

    useEffect(() => {
        const duration = NOTIFICATION_DISPLAY_DURATION[priority];

        const timeout = setTimeout(() => {
            setNotifications(
                notifications.filter((notification) => notification.id !== id),
            );
        }, duration);

        return () => {
            clearTimeout(timeout);
        };
    }, [notifications, id, priority, setNotifications]);
};

type TUseGetRemoveNotification = (id: INotification['id']) => VoidFunction;

const useGetRemoveNotification: TUseGetRemoveNotification = (id) => {
    const { notifications, setNotifications } = useNotificationsContext();

    return useCallback(() => {
        setNotifications(
            notifications.filter((notification) => notification.id !== id),
        );
    }, [id, notifications, setNotifications]);
};

type TUseAddNetworkStatusToNotifications = () => (
    networkStatus: ENetworkStatus,
) => void;

export const useAddNetworkStatusToNotifications: TUseAddNetworkStatusToNotifications =
    () => {
        const addErrorMessageToNotifications =
            useAddErrorMessageToNotifications();
        const addSuccessMessageToNotifications =
            useAddSuccessMessageToNotifications();
        const removeNotification = useGetRemoveNotification(
            OFFLINE_NOTIFICATION_ID,
        );

        return useCallback(
            (networkStatus) => {
                const isOffline = networkStatus === ENetworkStatus.OFFLINE;

                if (isOffline) {
                    addErrorMessageToNotifications({
                        id: OFFLINE_NOTIFICATION_ID,
                        message: 'You are currently offline',
                        priority: NOTIFICATION_OFFLINE_NETWORK_STATUS_PRIORITY,
                    });
                } else {
                    removeNotification();
                    addSuccessMessageToNotifications({
                        message: 'Connected',
                        priority: NOTIFICATION_ONLINE_NETWORK_STATUS_PRIORITY,
                    });
                }
            },
            [
                addErrorMessageToNotifications,
                addSuccessMessageToNotifications,
                removeNotification,
            ],
        );
    };
