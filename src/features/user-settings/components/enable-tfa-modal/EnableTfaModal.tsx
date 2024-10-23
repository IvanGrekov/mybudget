import { useState, lazy, Suspense } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';

import { enableTfa } from 'actions/enableTfa';
import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import Modal from 'components/modal/Modal';
import Show from 'components/show/Show';
import styles from 'features/user-settings/components/enable-tfa-modal/EnableTfaModal.module.scss';
import EnableTfaModalSkeleton from 'features/user-settings/components/enable-tfa-modal/EnableTfaModalSkeleton';
import ScanQrCodeStageContent from 'features/user-settings/components/enable-tfa-modal/ScanQrCodeStageContent';
import { EEnableTfaStages } from 'features/user-settings/components/enable-tfa-modal/types/enableTfaStages';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';
import { EFetchingTags } from 'types/fetchingTags';
import { InitiateTfaEnablingDtoResult, User } from 'types/generated.types';

const EnterCodeStageContentLazy = lazy(
    () =>
        import(
            'features/user-settings/components/enable-tfa-modal/EnterCodeStageContent'
        ),
);

const INITIAL_STAGE = EEnableTfaStages.SCAN_QR_CODE;

export default function EnableTfaModal({
    isOpen,
    onClose,
}: ITfaSettingsModalProps): JSX.Element {
    const [code, setCode] = useState('');
    const [tfaData, setTfaData] = useState<InitiateTfaEnablingDtoResult | null>(
        null,
    );
    const [isConfirmedScanning, setIsConfirmedScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stage, setStage] = useState(INITIAL_STAGE);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return enableTfa(code);
        },
        onSuccess: () => {
            queryClient.setQueryData([EFetchingTags.ME], (oldData: User) => ({
                ...oldData,
                isTfaEnabled: true,
            }));
            onClose();
            resetState();
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    const confirmText = stage === INITIAL_STAGE ? 'Next' : 'Enable';
    const isConfirmButtonDisabled =
        !isOpen ||
        (stage === EEnableTfaStages.SCAN_QR_CODE && !isConfirmedScanning) ||
        (stage === EEnableTfaStages.ENTER_CODE && !code);

    const confirmQrCodeScanning = (): void => {
        setStage(EEnableTfaStages.ENTER_CODE);
    };

    const goBack = (): void => {
        setStage(INITIAL_STAGE);
        setCode('');
    };

    const resetState = (): void => {
        setCode('');
        setTfaData(null);
        setIsConfirmedScanning(false);
        setStage(INITIAL_STAGE);
    };

    const onCancel = (): void => {
        onClose();
        setStage(INITIAL_STAGE);
        setError('');
        setCode('');
    };

    const onConfirm =
        stage === EEnableTfaStages.SCAN_QR_CODE
            ? confirmQrCodeScanning
            : mutate;

    return (
        <Modal
            isOpen={isOpen}
            title="Enable Two-Factor Authentication"
            isLoading={isPending}
            size="medium"
            onClose={onClose}
            actions={
                <>
                    <Show when={stage === EEnableTfaStages.ENTER_CODE}>
                        <Button
                            text="Back"
                            variant="outlined"
                            onClick={goBack}
                        />
                    </Show>
                    <ConfirmAction
                        confirmText={confirmText}
                        isLoading={isPending}
                        isDisabled={isConfirmButtonDisabled}
                        onConfirm={onConfirm}
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
                <Show when={stage === EEnableTfaStages.SCAN_QR_CODE}>
                    <ScanQrCodeStageContent
                        tfaData={tfaData}
                        isConfirmedScanning={isConfirmedScanning}
                        setTfaData={setTfaData}
                        setIsConfirmedScanning={setIsConfirmedScanning}
                        setError={setError}
                    />
                </Show>

                <Show when={stage === EEnableTfaStages.ENTER_CODE}>
                    <Suspense fallback={<EnableTfaModalSkeleton />}>
                        <EnterCodeStageContentLazy
                            code={code}
                            setCode={setCode}
                        />
                    </Suspense>
                </Show>
            </div>
        </Modal>
    );
}
