import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { UserDefaultCurrencyEnum } from 'types/generated.types';

const UserCurrencyModalContentLazy = lazy(
    () =>
        import(
            'features/user-currency-section/user-currency-modal/UserCurrencyModalContent'
        ),
);

interface IUserCurrencyModalProps extends IModalBaseProps {
    userId: number;
    userDefaultCurrency: UserDefaultCurrencyEnum;
}

export default function UserCurrencyModal({
    isOpen,
    userId,
    userDefaultCurrency,
    onClose,
}: IUserCurrencyModalProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Change Default Currency"
            size="large"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <UserCurrencyModalContentLazy
                    userId={userId}
                    userDefaultCurrency={userDefaultCurrency}
                    onClose={onClose}
                />
            </Suspense>
        </Modal>
    );
}
