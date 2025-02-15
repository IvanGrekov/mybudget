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
import {
    useGetFeatureTranslations,
    useGetActionButtonsTranslations,
} from 'hooks/translations.hooks';

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

    const [title, fieldLabel] = useGetFeatureTranslations({
        featureName: 'SettingsPage',
        keys: ['disable-two-factor-authentication', 'authenticator_app_code'],
    });
    const submitText = useGetActionButtonsTranslations()('confirm');

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            actions={
                <>
                    <CancelAction onCancel={onCompleted} />
                    <ConfirmAction
                        confirmText={submitText}
                        isLoading={isLoading}
                        isDisabled={!code}
                        onConfirm={mutate}
                    />
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
                    label={fieldLabel}
                    isFullWidth={true}
                />
            </div>
        </Modal>
    );
}
