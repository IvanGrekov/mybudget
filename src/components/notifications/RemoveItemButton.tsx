import IconButton from 'components/button/IconButton';
import CloseIcon from 'components/icons/CloseIcon';
import styles from 'components/notifications/Notifications.module.scss';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import { INotification } from 'types/notificationsContext.types';

interface IRemoveItemButtonProps {
    id: INotification['id'];
}

export default function RemoveItemButton({
    id,
}: IRemoveItemButtonProps): JSX.Element {
    const { setNotifications } = useNotificationsContext();

    const onRemoveNotification = (id: INotification['id']): void => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id),
        );
    };

    return (
        <IconButton
            Icon={CloseIcon}
            iconSize={25}
            onClick={(): void => onRemoveNotification(id)}
            title="Remove notification"
            className={styles['close-button']}
        />
    );
}
