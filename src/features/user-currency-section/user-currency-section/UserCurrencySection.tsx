'use client';

import Button from 'components/button/Button';
import UserCurrencyModal from 'features/user-currency-section/user-currency-modal/UserCurrencyModal';
import styles from 'features/user-currency-section/user-currency-section/UserCurrencySection.module.scss';
import { useGetSettingsTranslations } from 'hooks/translations.hooks';
import { useModal } from 'hooks/useModal';
import { UserDefaultCurrencyEnum } from 'types/generated.types';

interface IUserCurrencySectionProps {
    userId: number;
    userDefaultCurrency: UserDefaultCurrencyEnum;
}

export default function UserCurrencySection({
    userId,
    userDefaultCurrency,
}: IUserCurrencySectionProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    const settingsTranslations = useGetSettingsTranslations();

    const title = settingsTranslations('change_default_currency');

    return (
        <div className={styles.container}>
            <Button text={title} onClick={openModal} />

            <UserCurrencyModal
                isOpen={isModalOpen}
                title={title}
                userId={userId}
                userDefaultCurrency={userDefaultCurrency}
                onClose={closeModal}
            />
        </div>
    );
}
