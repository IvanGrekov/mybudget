'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    PropsWithChildren,
} from 'react';

import {
    DEFAULT_NOTIFICATIONS,
    MAX_NOTIFICATIONS,
    DEFAULT_NOTIFICATION_PRIORITY,
} from 'constants/notifications.constants';
import {
    TNotificationsContextValue,
    TAddNotification,
} from 'types/notificationsContext.types';

const NotificationsContext = createContext<TNotificationsContextValue | null>(
    null,
);

export const useNotificationsContext = (): TNotificationsContextValue => {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error(
            'useNotificationsContext must be used within a NotificationsProvider',
        );
    }

    return context;
};

type TUseInitNotifications = () => TNotificationsContextValue;

export const useInitNotifications: TUseInitNotifications = () => {
    const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

    const addNotification = useCallback<TAddNotification>(
        ({ priority = DEFAULT_NOTIFICATION_PRIORITY, ...newNotification }) => {
            setNotifications((prevNotifications) => {
                const slicedPrevNotifications =
                    prevNotifications.length === MAX_NOTIFICATIONS
                        ? [...prevNotifications.slice(1, MAX_NOTIFICATIONS)]
                        : prevNotifications;

                return [
                    ...slicedPrevNotifications,
                    { ...newNotification, priority },
                ];
            });
        },
        [],
    );

    return useMemo(
        () => ({ notifications, addNotification, setNotifications }),
        [notifications, addNotification, setNotifications],
    );
};

export function NotificationsProvider({
    children,
}: PropsWithChildren): JSX.Element {
    const value = useInitNotifications();

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
}
