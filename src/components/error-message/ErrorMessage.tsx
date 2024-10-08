import NotificationItemBody from 'components/notifications/NotificationItemBody';
import {
    ENotificationType,
    ENotificationSize,
} from 'types/notificationsContext.types';

interface IErrorMessageProps {
    message?: string | null;
    className?: string;
}

export default function ErrorMessage({
    message,
    className,
}: IErrorMessageProps): JSX.Element | null {
    if (!message) {
        return null;
    }

    return (
        <NotificationItemBody
            message={message}
            type={ENotificationType.ERROR}
            fullWidth={true}
            size={ENotificationSize.SMALL}
            className={className}
        />
    );
}
