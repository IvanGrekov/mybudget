import TimeZoneSettings from 'features/user-settings/components/time-zone-settings/TimeZoneSettings';
import { User } from 'types/generated.types';

interface IUserSettingsProps {
    userId: User['id'];
    userTimeZone: User['timeZone'];
}

export default function UserSettings({
    userId,
    userTimeZone,
}: IUserSettingsProps): JSX.Element {
    return (
        <div>
            <TimeZoneSettings userId={userId} initValue={userTimeZone} />
        </div>
    );
}
