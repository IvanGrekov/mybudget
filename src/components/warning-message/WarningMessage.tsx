import NotificationItemBody from 'components/notifications/NotificationItemBody';
import {
    ENotificationType,
    ENotificationSize,
} from 'types/notificationsContext.types';
import { Maybe } from 'types/utility.types';

interface IWarningMessageProps {
    message?: Maybe<string>;
    className?: string;
}

export default function WarningMessage({
    message,
    className,
}: IWarningMessageProps): JSX.Element | null {
    if (!message) {
        return null;
    }

    return (
        <NotificationItemBody
            message={message}
            type={ENotificationType.WARNING}
            fullWidth={true}
            size={ENotificationSize.SMALL}
            className={className}
        />
    );
}
