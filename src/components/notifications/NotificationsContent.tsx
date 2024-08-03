import NotificationItem from 'components/notifications/NotificationItem';
import styles from 'components/notifications/Notifications.module.scss';
import { useNotificationsContext } from 'contexts/NotificationsContext';

export default function NotificationsContent(): JSX.Element | null {
    const { notifications } = useNotificationsContext();

    return (
        <div className={styles.notifications}>
            {notifications.map((notificationItem) => (
                <NotificationItem
                    key={notificationItem.id}
                    {...notificationItem}
                />
            ))}
        </div>
    );
}
