'use client';

import { useState, lazy, Suspense } from 'react';

import Chip from 'components/chip/Chip';
import CancelAction from 'components/confirmation-modal/CancelAction';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import Tooltip from 'components/tooltip/Tooltip';
import styles from 'features/overall-balance/components/overall-balance/OverallBalance.module.scss';
import { useCalculateOverallBalance } from 'features/overall-balance/components/overall-balance/hooks/useCalculateOverallBalance';
import { useIsScreenSize } from 'hooks/screenSize.hooks';
import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { EScreenSizeNames } from 'types/screenSizeNames';

const BalanceDetailsLazy = lazy(
    () =>
        import(
            'features/overall-balance/components/balance-details/BalanceDetails'
        ),
);

interface IOverallBalanceProps {
    userCurrency: UserDefaultCurrencyEnum;
}

export default function OverallBalance({
    userCurrency,
}: IOverallBalanceProps): JSX.Element | null {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isMobile = useIsScreenSize(EScreenSizeNames.XS);

    const { accounts, isLoading } = useGetAllAccounts();
    const overallBalance = useCalculateOverallBalance({
        accounts,
        userCurrency,
    });

    if (isLoading || !accounts?.length || typeof overallBalance !== 'number') {
        return null;
    }

    const value = `${overallBalance} ${userCurrency}`;
    const fullTitle = `Overall Balance: ${value}`;
    const title = isMobile ? value : fullTitle;

    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.container}>
                <Tooltip
                    position="bottom"
                    text={`${fullTitle}. Click to see details`}
                >
                    <Chip
                        title={title}
                        variant="outlined"
                        size="big"
                        titleVariant="subtitle1"
                        className={styles.chip}
                        onClick={() => setIsModalOpen(true)}
                    />
                </Tooltip>
            </div>

            <Modal
                isOpen={isModalOpen}
                title={fullTitle}
                size="large"
                actions={<CancelAction onCancel={closeModal} />}
                onClose={closeModal}
            >
                <Suspense fallback={<ModalCircularLoading />}>
                    <BalanceDetailsLazy accounts={accounts} />
                </Suspense>
            </Modal>
        </>
    );
}
