import Button from 'components/button/Button';
import TfaSettingsModal from 'features/user-settings/components/tfa-settings-modal/TfaSettingsModal';
import { useModal } from 'hooks/useModal';

interface IUserSecuritySectionProps {
    isTfaEnabled: boolean;
}

export default function UserSecuritySection({
    isTfaEnabled,
}: IUserSecuritySectionProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();
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
