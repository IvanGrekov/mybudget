import { useState } from 'react';

import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import Modal from 'components/modal/Modal';
import { EEnableTfaStages } from 'features/user-settings/components/enable-tfa-modal/types/enableTfaStages';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';

export default function EnableTfaModal({
    isOpen,
    onClose,
}: ITfaSettingsModalProps): JSX.Element {
    const [stage, setStage] = useState(EEnableTfaStages.SCAN_QR_CODE);

    const confirmText =
        stage === EEnableTfaStages.SCAN_QR_CODE ? 'Next' : 'Enable';

    const confirmQrCodeScanning = (): void => {
        setStage(EEnableTfaStages.ENTER_CODE);
    };

    const enableTfa = (): void => {
        onClose();
        setStage(EEnableTfaStages.ENTER_CODE);
    };

    const onConfirm =
        stage === EEnableTfaStages.SCAN_QR_CODE
            ? confirmQrCodeScanning
            : enableTfa;

    return (
        <Modal
            isOpen={isOpen}
            title="Enable Two-Factor Authentication"
            actions={
                <>
                    <ConfirmAction
                        confirmText={confirmText}
                        onConfirm={onConfirm}
                    />
                    <CancelAction onCancel={onClose} />
                </>
            }
            onClose={onClose}
        />
    );
}
