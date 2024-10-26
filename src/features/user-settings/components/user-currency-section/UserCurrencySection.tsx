'use client';

import Button from 'components/button/Button';
import UserCurrencyModal from 'features/user-settings/components/user-currency-modal/UserCurrencyModal';
import { useModal } from 'hooks/useModal';
import { UserDefaultCurrencyEnum } from 'types/generated.types';

interface IUserCurrencySectionProps {
    userDefaultCurrency: UserDefaultCurrencyEnum;
}

export default function UserCurrencySection({
    userDefaultCurrency,
}: IUserCurrencySectionProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Button text="Change Default Currency" onClick={openModal} />

            <UserCurrencyModal
                isOpen={isModalOpen}
                userDefaultCurrency={userDefaultCurrency}
                onClose={closeModal}
            />
        </>
    );
}
