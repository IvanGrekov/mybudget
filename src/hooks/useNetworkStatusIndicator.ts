import { useEffect } from 'react';

import { useAddNetworkStatusToNotifications } from 'hooks/notifications.hooks';
import { ENetworkStatus } from 'types/networkStatus';

const NETWORK_EVENTS = [ENetworkStatus.OFFLINE, ENetworkStatus.ONLINE];

export const useNetworkStatusIndicator = (): void => {
    const addNetworkStatusToNotifications =
        useAddNetworkStatusToNotifications();

    useEffect(() => {
        const networkListener = (e: Event): void => {
            const { type } = e;
            const newNetworkStatus =
                type === ENetworkStatus.OFFLINE
                    ? ENetworkStatus.OFFLINE
                    : ENetworkStatus.CONNECTED;

            addNetworkStatusToNotifications(newNetworkStatus);
        };

        NETWORK_EVENTS.forEach((event) =>
            window.addEventListener(event, networkListener),
        );

        return (): void => {
            NETWORK_EVENTS.forEach((event) =>
                window.removeEventListener(event, networkListener),
            );
        };
    }, [addNetworkStatusToNotifications]);
};
