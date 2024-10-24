import Button from 'components/button/Button';
import TfaSettingsModal from 'features/user-settings/components/tfa-settings-modal/TfaSettingsModal';
import { useModal } from 'hooks/useModal';

interface IUserSecuritySectionProps {
    isTfaEnabled: boolean;
    googleId?: string;
}

export default function UserSecuritySection({
    isTfaEnabled,
    googleId,
}: IUserSecuritySectionProps): JSX.Element | null {
    const { isModalOpen, openModal, closeModal } = useModal();

    if (googleId) {
        return null;
    }

    const text = isTfaEnabled
        ? 'Disable Two-Factor Authentication'
        : 'Enable Two-Factor Authentication';

    return (
        <>
            <Button variant="contained" text={text} onClick={openModal} />

            <TfaSettingsModal
                isTfaEnabled={isTfaEnabled}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}
