import { useState } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { disableTfa } from 'actions/disableTfa';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import Modal from 'components/modal/Modal';
import TextField from 'components/text-field/TextField';
import { VERIFICATION_CODE_LENGTH } from 'constants/verificationCodeLength';
import styles from 'features/user-settings/components/disable-tfa-modal/DisableTfaModal.module.scss';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';
import { EFetchingTags } from 'types/fetchingTags';
import { User } from 'types/generated.types';

export default function DisableTfaModal({
    isOpen,
    onClose,
}: ITfaSettingsModalProps): JSX.Element {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return disableTfa(code);
        },
        onSuccess: () => {
            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                isTfaEnabled: false,
            }));
            onClose();
            resetState();
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    const resetState = (): void => {
        setCode('');
        setError(null);
    };

    const onCancel = (): void => {
        onClose();
        resetState();
    };

    return (
        <Modal
            isOpen={isOpen}
            title="Disable Two-Factor Authentication"
            isLoading={isPending}
            onClose={onClose}
            actions={
                <>
                    <ConfirmAction
                        confirmText="Confirm"
                        isLoading={isPending}
                        isDisabled={!code}
                        onConfirm={mutate}
                    />
                    <CancelAction onCancel={onCancel} />
                </>
            }
        >
            <div className={styles.container}>
                {error && (
                    <ErrorMessage
                        message={error}
                        className={styles['error-message']}
                    />
                )}
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
