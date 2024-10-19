import DisableTfaModal from 'features/user-settings/components/disable-tfa-modal/DisableTfaModal';
import EnableTfaModal from 'features/user-settings/components/enable-tfa-modal/EnableTfaModal';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';

export default function TfaSettingsModal({
    isTfaEnabled,
    isOpen,
    onClose,
}: ITfaSettingsModalProps): JSX.Element {
    if (isTfaEnabled) {
        return (
            <DisableTfaModal
                isTfaEnabled={isTfaEnabled}
                isOpen={isOpen}
                onClose={onClose}
            />
        );
    }

    return (
        <EnableTfaModal
            isTfaEnabled={isTfaEnabled}
            isOpen={isOpen}
            onClose={onClose}
        />
    );
}
