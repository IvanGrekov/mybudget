import cx from 'classnames';

import IconButton from 'components/button/IconButton';
import CloseIcon from 'components/icons/CloseIcon';
import styles from 'components/notifications/Notifications.module.scss';
import Typography from 'components/typography/Typography';
import { useNotificationsContext } from 'contexts/NotificationsContext';
import { useAutoRemoveNotification } from 'hooks/notifications.hooks';
import { INotification } from 'types/notificationsContext.types';

export default function NotificationItem({
    id,
    message,
    type,
    priority,
}: INotification): JSX.Element {
    const { setNotifications } = useNotificationsContext();

    useAutoRemoveNotification({
        id,
        priority,
    });

    const onRemoveNotification = (id: INotification['id']): void => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id),
        );
    };

    return (
        <div className={cx(styles.item, styles[`item--${type}`])}>
            <Typography
                element="h6"
                variant="subtitle2"
                className={styles.text}
            >
                {message}
            </Typography>

            <IconButton
                Icon={CloseIcon}
                iconSize={25}
                onClick={(): void => onRemoveNotification(id)}
                title="Remove notification"
                className={styles['close-button']}
            />
        </div>
    );
}
