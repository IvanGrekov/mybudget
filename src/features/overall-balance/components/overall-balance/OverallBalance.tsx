'use client';

import { lazy, Suspense } from 'react';

import Chip from 'components/chip/Chip';
import CancelAction from 'components/confirmation-modal/CancelAction';
import DefaultModalContainer from 'components/modal/DefaultModalContainer';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import styles from 'features/overall-balance/components/overall-balance/OverallBalance.module.scss';
import { useCalculateOverallBalance } from 'features/overall-balance/components/overall-balance/hooks/useCalculateOverallBalance';
import { useIsScreenSize } from 'hooks/screenSize.hooks';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';
import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import { useModal } from 'hooks/useModal';
import { UserDefaultCurrencyEnum } from 'types/generated.types';
import { EScreenSizeNames } from 'types/screenSizeNames';
import { roundValue } from 'utils/roundValue';

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
    const { isModalOpen, openModal, closeModal } = useModal();

    const isMobile = useIsScreenSize(EScreenSizeNames.XS);

    const { accounts, isLoading } = useGetAllAccounts();
    const overallBalance = useCalculateOverallBalance({
        accounts,
        userCurrency,
    });

    const [translatedTitle] = useGetFeatureTranslations({
        featureName: 'OverallBalance',
    });

    if (isLoading || !accounts?.length || typeof overallBalance !== 'number') {
        return null;
    }

    const value = `${roundValue(overallBalance)} ${userCurrency}`;
    const fullTitle = `${translatedTitle}: ${value}`;
    const title = isMobile ? value : fullTitle;

    return (
        <>
            <div className={styles.container}>
                <Chip
                    title={title}
                    variant="outlined"
                    size="big"
                    titleVariant="subtitle1"
                    className={styles.chip}
                    onClick={openModal}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                title={fullTitle}
                size="large"
                actions={<CancelAction onCancel={closeModal} />}
                onClose={closeModal}
            >
                <Suspense fallback={<ModalCircularLoading />}>
                    <DefaultModalContainer>
                        <BalanceDetailsLazy accounts={accounts} />
                    </DefaultModalContainer>
                </Suspense>
            </Modal>
        </>
    );
}
