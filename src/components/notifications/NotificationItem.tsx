import NotificationItemBody from 'components/notifications/NotificationItemBody';
import RemoveItemButton from 'components/notifications/RemoveItemButton';
import { useAutoRemoveNotification } from 'hooks/notifications.hooks';
import { INotification } from 'types/notificationsContext.types';

export default function NotificationItem({
    id,
    priority,
    ...rest
}: INotification): JSX.Element {
    useAutoRemoveNotification({
        id,
        priority,
    });

    return (
        <NotificationItemBody
            {...rest}
            removeButton={<RemoveItemButton id={id} />}
        />
    );
}
