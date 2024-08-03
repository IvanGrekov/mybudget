import { Dispatch, SetStateAction } from 'react';

export enum ENotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
}

export enum ENotificationPriority {
    HIGHEST = 1,
    HIGH = 2,
    MEDIUM = 3,
    LOW = 4,
}

export interface INotification {
    id: string;
    message: string;
    type: ENotificationType;
    priority: ENotificationPriority;
}

export type TNotifications = Array<INotification>;

export type TAddNotification = (
    notification: Omit<INotification, 'priority'> & {
        priority?: ENotificationPriority;
    },
) => void;

export type TNotificationsContextValue = {
    notifications: TNotifications;
    addNotification: TAddNotification;
    setNotifications: Dispatch<SetStateAction<TNotifications>>;
};
