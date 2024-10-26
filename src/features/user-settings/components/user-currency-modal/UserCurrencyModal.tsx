import CancelAction from 'components/confirmation-modal/CancelAction';
import Modal from 'components/modal/Modal';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import UserCurrencyForm from 'features/user-settings/components/user-currency-form/UserCurrencyForm';
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
            size="medium"
            onClose={onClose}
            actions={
                <>
                    <CancelAction onCancel={onClose} />
                </>
            }
        >
            <UnderDevelopmentMessage />
            <UserCurrencyForm userDefaultCurrency={userDefaultCurrency} />
        </Modal>
    );
}
