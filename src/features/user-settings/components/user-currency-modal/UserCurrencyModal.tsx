import Modal from 'components/modal/Modal';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import UserCurrencyModalContent from 'features/user-settings/components/user-currency-modal/UserCurrencyModalContent';
import { UserDefaultCurrencyEnum } from 'types/generated.types';

interface IUserCurrencyModalProps extends IModalBaseProps {
    userDefaultCurrency: UserDefaultCurrencyEnum;
}

export default function UserCurrencyModal({
    isOpen,
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
            <UserCurrencyModalContent
                userDefaultCurrency={userDefaultCurrency}
                onClose={onClose}
            />
        </Modal>
    );
}
