import { useEffect, useState } from 'react';

import Image from 'next/image';

import Checkbox from 'components/checkbox/Checkbox';
import Typography from 'components/typography/Typography';
import styles from 'features/user-settings/components/enable-tfa-modal/EnableTfaModal.module.scss';
import EnableTfaModalSkeleton from 'features/user-settings/components/enable-tfa-modal/EnableTfaModalSkeleton';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { InitiateTfaEnablingDtoResult } from 'types/generated.types';
import { getFailedResponseMessage } from 'utils/failedResponse.utils';

interface IScanQrCodeStageContentProps {
    tfaData: InitiateTfaEnablingDtoResult | null;
    isConfirmedScanning: boolean;
    setTfaData: (tfaData: InitiateTfaEnablingDtoResult) => void;
    setIsConfirmedScanning: (isConfirmedScanning: boolean) => void;
    setError: (error: string) => void;
}

const QR_CODE_SIZE = 250;
let ABORT_CONTROLLER = new AbortController();

export default function ScanQrCodeStageContent({
    tfaData,
    isConfirmedScanning,
    setTfaData,
    setIsConfirmedScanning,
    setError,
}: IScanQrCodeStageContentProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (tfaData) {
            return;
        }

        ABORT_CONTROLLER = new AbortController();

        CLIENT_MY_BUDGET_API.initiateTfaEnabling(ABORT_CONTROLLER.signal)
            .then((data) => {
                if (!data) {
                    throw new Error('Failed to get QR code');
                }
                setTfaData(data);
            })
            .catch((error) => {
                if (error?.message?.toLowerCase().includes('aborted')) {
                    return;
                }
                setError(getFailedResponseMessage(error));
            })
            .finally(() => {
                setIsLoading(false);
            });

        return (): void => {
            ABORT_CONTROLLER.abort();
            ABORT_CONTROLLER = new AbortController();
        };
    }, [tfaData, setTfaData, setError]);

    if (isLoading || !tfaData) {
        return <EnableTfaModalSkeleton />;
    }

    return (
        <>
            <Image
                src={tfaData.dataUrl}
                alt="QR code"
                width={QR_CODE_SIZE}
                height={QR_CODE_SIZE}
            />

            <Typography variant="subtitle1">{tfaData.secret}</Typography>

            <Checkbox
                label="I have scanned the QR code with my authenticator app"
                checked={isConfirmedScanning}
                onChange={setIsConfirmedScanning}
                disabled={isConfirmedScanning}
                containerClassName={styles['confirm-scanning-field']}
            />
        </>
    );
}
