import { useState, lazy, Suspense } from 'react';

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
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

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
    const [img, setImg] = useState<string | null>(null);
    const [isConfirmedScanning, setIsConfirmedScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [stage, setStage] = useState(INITIAL_STAGE);

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

    const resetModal = (): void => {
        setCode('');
        setImg(null);
        setIsConfirmedScanning(false);
        setStage(INITIAL_STAGE);
    };

    const enableTfa = async (): Promise<void> => {
        setIsLoading(true);

        await CLIENT_MY_BUDGET_API.enableTfa(code)
            .then(() => {
                onClose();
                resetModal();
            })
            .catch((e) => {
                setError(getFailedResponseMessage(e));
            })
            .finally(() => {
                setIsLoading(false);
            });
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
            : enableTfa;

    return (
        <Modal
            isOpen={isOpen}
            title="Enable Two-Factor Authentication"
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
            isLoading={isLoading}
            onClose={onClose}
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
                        img={img}
                        isConfirmedScanning={isConfirmedScanning}
                        setImg={setImg}
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
