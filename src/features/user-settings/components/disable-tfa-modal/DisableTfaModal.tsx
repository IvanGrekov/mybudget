import CancelAction from 'components/confirmation-modal/CancelAction';
// import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import Modal from 'components/modal/Modal';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';

export default function DisableTfaModal({
    isOpen,
    onClose,
}: ITfaSettingsModalProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Disable Two-Factor Authentication"
            actions={
                <>
                    {/* <ConfirmAction
                        confirmText="Confirm"
                        onConfirm={onConfirm}
                    /> */}
                    <CancelAction onCancel={onClose} />
                </>
            }
            onClose={onClose}
        />
    );
}
