import CreateItemButton from 'components/create-item-button/CreateItemButton';
import { MAX_ACCOUNTS_PER_USER } from 'constants/maxAccountPerUser';
import CreateAccountModal from 'features/account-form-modal/components/create-account-modal/CreateAccountModal';
import { useModal } from 'hooks/useModal';
import { AccountTypeEnum } from 'types/generated.types';

interface ICreateAccountButtonProps {
    currentAccountsLength: number;
    defaultAccountType: AccountTypeEnum;
}

export default function CreateAccountButton({
    currentAccountsLength,
    defaultAccountType,
}: ICreateAccountButtonProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <CreateItemButton
                isDisabled={currentAccountsLength >= MAX_ACCOUNTS_PER_USER}
                onClick={openModal}
            />

            <CreateAccountModal
                defaultAccountType={defaultAccountType}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}
