import { useState } from 'react';

import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import Modal from 'components/modal/Modal';
import TextField from 'components/text-field/TextField';
import { VERIFICATION_CODE_LENGTH } from 'constants/verificationCodeLength';
import styles from 'features/user-settings/components/disable-tfa-modal/DisableTfaModal.module.scss';
import { useDisableTfa } from 'features/user-settings/components/disable-tfa-modal/hooks/useDisableTfa';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';

export default function DisableTfaModal({
    isOpen,
    onClose,
}: ITfaSettingsModalProps): JSX.Element {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onCompleted = (): void => {
        setCode('');
        setError(null);
        onClose();
    };

    const { mutate, isLoading } = useDisableTfa({
        code,
        onCompleted,
        setError,
    });

    return (
        <Modal
            isOpen={isOpen}
            title="Disable Two-Factor Authentication"
            onClose={onClose}
            actions={
                <>
                    <ConfirmAction
                        confirmText="Confirm"
                        isLoading={isLoading}
                        isDisabled={!code}
                        onConfirm={mutate}
                    />
                    <CancelAction onCancel={onCompleted} />
                </>
            }
        >
            <div className={styles.container}>
                {error && <ErrorMessage message={error} />}
                <TextField
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="number"
                    maxLength={VERIFICATION_CODE_LENGTH}
                    label="Authenticator App Code"
                    isFullWidth={true}
                />
            </div>
        </Modal>
    );
}
