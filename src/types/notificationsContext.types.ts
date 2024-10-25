import { Dispatch, SetStateAction } from 'react';

export enum ENotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

export enum ENotificationSize {
    REGULAR = 'regular',
    SMALL = 'small',
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
    fullWidth?: boolean;
    className?: string;
    size?: ENotificationSize;
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
