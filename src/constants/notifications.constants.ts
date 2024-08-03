import { v4 as uuidv4 } from 'uuid';

import {
    TNotifications,
    ENotificationPriority,
} from 'types/notificationsContext.types';

export const DEFAULT_NOTIFICATIONS: TNotifications = [];

export const MAX_NOTIFICATIONS = 3;

export const NOTIFICATION_DISPLAY_DURATION = {
    [ENotificationPriority.HIGHEST]: 8000,
    [ENotificationPriority.HIGH]: 7000,
    [ENotificationPriority.MEDIUM]: 6000,
    [ENotificationPriority.LOW]: 5000,
};

export const DEFAULT_NOTIFICATION_PRIORITY = ENotificationPriority.LOW;

export const DEFAULT_NOTIFICATION_DISPLAY_DURATION =
    NOTIFICATION_DISPLAY_DURATION[ENotificationPriority.LOW];

export const NOTIFICATION_OFFLINE_NETWORK_STATUS_PRIORITY =
    ENotificationPriority.HIGHEST;
export const NOTIFICATION_ONLINE_NETWORK_STATUS_PRIORITY =
    ENotificationPriority.LOW;

export const OFFLINE_NOTIFICATION_ID = uuidv4();
