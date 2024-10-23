import { useEffect, useState } from 'react';

import Image from 'next/image';

import Checkbox from 'components/checkbox/Checkbox';
import EnableTfaModalSkeleton from 'features/user-settings/components/enable-tfa-modal/EnableTfaModalSkeleton';
import { CLIENT_MY_BUDGET_API } from 'models/clientMyBudgetApi';
import { getFailedResponseMessage } from 'utils/getFailedResponseMessage';

interface IScanQrCodeStageContentProps {
    img: string | null;
    isConfirmedScanning: boolean;
    setIsConfirmedScanning: (isConfirmedScanning: boolean) => void;
    setImg: (img: string) => void;
    setError: (error: string) => void;
}

const QR_CODE_SIZE = 250;
let ABORT_CONTROLLER = new AbortController();

export default function ScanQrCodeStageContent({
    img,
    isConfirmedScanning,
    setIsConfirmedScanning,
    setImg,
    setError,
}: IScanQrCodeStageContentProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (img) {
            return;
        }

        ABORT_CONTROLLER = new AbortController();

        CLIENT_MY_BUDGET_API.initiateTfaEnabling(ABORT_CONTROLLER.signal)
            .then((data) => {
                const dataUrl = data?.dataUrl;
                if (!dataUrl) {
                    throw new Error('Failed to get QR code');
                }
                setImg(dataUrl);
            })
            .catch((error) => {
                if (error?.message.toLowerCase().includes('aborted')) {
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
    }, [img, setImg, setError]);

    if (isLoading || !img) {
        return <EnableTfaModalSkeleton />;
    }

    return (
        <>
            <Image
                src={img}
                alt="QR code"
                width={QR_CODE_SIZE}
                height={QR_CODE_SIZE}
            />

            <Checkbox
                label="I have scanned the QR code with my authenticator app"
                checked={isConfirmedScanning}
                onChange={setIsConfirmedScanning}
                disabled={isConfirmedScanning}
            />
        </>
    );
}
