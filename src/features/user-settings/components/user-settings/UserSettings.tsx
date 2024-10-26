import Show from 'components/show/Show';
import UserCurrencySection from 'features/user-settings/components/user-currency-section/UserCurrencySection';
import UserSecuritySection from 'features/user-settings/components/user-security-section/UserSecuritySection';
import styles from 'features/user-settings/components/user-settings/UserSettings.module.scss';
import UserSettingsForm from 'features/user-settings/components/user-settings-form/UserSettingsForm';
import { User } from 'types/generated.types';

interface IUserSettingsProps {
    user: User;
}

export default function UserSettings({
    user,
}: IUserSettingsProps): JSX.Element {
    const {
        id: userId,
        nickname: userNickname,
        timeZone: userTimeZone,
        defaultCurrency: userDefaultCurrency,
        isTfaEnabled,
        googleId,
    } = user;

    return (
        <div className={styles.container}>
            <UserSettingsForm
                userId={userId}
                userNickname={userNickname}
                userTimeZone={userTimeZone}
            />

            <div className={styles.actions}>
                <UserCurrencySection
                    userDefaultCurrency={userDefaultCurrency}
                />

                <Show when={!googleId}>
                    <UserSecuritySection isTfaEnabled={isTfaEnabled} />
                </Show>
            </div>
        </div>
    );
}
