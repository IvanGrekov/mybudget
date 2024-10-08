import { ReactNode } from 'react';

import cx from 'classnames';

import styles from 'components/notifications/Notifications.module.scss';
import Typography from 'components/typography/Typography';
import {
    ENotificationSize,
    INotification,
} from 'types/notificationsContext.types';

interface INotificationItemBodyProps
    extends Pick<
        INotification,
        'message' | 'type' | 'size' | 'fullWidth' | 'className'
    > {
    removeButton?: ReactNode;
}

export default function NotificationItemBody({
    message,
    type,
    size = ENotificationSize.REGULAR,
    fullWidth,
    className,
    removeButton,
}: INotificationItemBodyProps): JSX.Element {
    return (
        <div
            className={cx(
                styles.item,
                styles[`item--${type}`],
                styles[`item--${size}`],
                {
                    [styles['item--full-width']]: fullWidth,
                },
                className,
            )}
        >
            <Typography
                element="h6"
                variant={
                    size === ENotificationSize.SMALL ? 'body1' : 'subtitle2'
                }
                className={styles.text}
            >
                {message}
            </Typography>

            {removeButton}
        </div>
    );
}
