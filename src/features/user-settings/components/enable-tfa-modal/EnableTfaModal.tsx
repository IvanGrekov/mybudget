import { useState, lazy, Suspense } from 'react';

import Button from 'components/button/Button';
import CancelAction from 'components/confirmation-modal/CancelAction';
import ConfirmAction from 'components/confirmation-modal/ConfirmAction';
import ErrorMessage from 'components/error-message/ErrorMessage';
import Modal from 'components/modal/Modal';
import Show from 'components/show/Show';
import styles from 'features/user-settings/components/enable-tfa-modal/EnableTfaModal.module.scss';
import EnableTfaModalSkeleton from 'features/user-settings/components/enable-tfa-modal/EnableTfaModalSkeleton';
import { useEnableTfa } from 'features/user-settings/components/enable-tfa-modal/hooks/useEnableTfa';
import { EEnableTfaStages } from 'features/user-settings/components/enable-tfa-modal/types/enableTfaStages';
import { ITfaSettingsModalProps } from 'features/user-settings/types/tfaSettingsModalProps';
import { InitiateTfaEnablingDtoResult } from 'types/generated.types';

const ScanQrCodeStageContentLazy = lazy(
    () =>
        import(
            'features/user-settings/components/enable-tfa-modal/ScanQrCodeStageContent'
        ),
);
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

    const onCompleted = (): void => {
        setCode('');
        setTfaData(null);
        setIsConfirmedScanning(false);
        setStage(INITIAL_STAGE);
        onClose();
    };

    const { mutate, isLoading } = useEnableTfa({
        code,
        onCompleted,
        setError,
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
                        isLoading={isLoading}
                        isDisabled={isConfirmButtonDisabled}
                        onConfirm={onConfirm}
                    />
                    <CancelAction onCancel={onCancel} />
                </>
            }
        >
            <Suspense fallback={<EnableTfaModalSkeleton />}>
                <div className={styles.container}>
                    {error && <ErrorMessage message={error} />}
                    <Show when={stage === EEnableTfaStages.SCAN_QR_CODE}>
                        <ScanQrCodeStageContentLazy
                            tfaData={tfaData}
                            isConfirmedScanning={isConfirmedScanning}
                            setTfaData={setTfaData}
                            setIsConfirmedScanning={setIsConfirmedScanning}
                            setError={setError}
                        />
                    </Show>

                    <Show when={stage === EEnableTfaStages.ENTER_CODE}>
                        <EnterCodeStageContentLazy
                            code={code}
                            setCode={setCode}
                        />
                    </Show>
                </div>
            </Suspense>
        </Modal>
    );
}
