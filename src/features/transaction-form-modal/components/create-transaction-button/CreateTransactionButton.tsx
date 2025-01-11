import CreateItemButton from 'components/create-item-button/CreateItemButton';
import CreateTransactionModal from 'features/transaction-form-modal/components/create-transaction-modal/CreateTransactionModal';
import { useModal } from 'hooks/useModal';

interface ICreateTransactionButtonProps {
    refetchTransactionList: VoidFunction;
}

export default function CreateTransactionButton({
    refetchTransactionList,
}: ICreateTransactionButtonProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    // TODO: Get selected filter value
    return (
        <>
            <CreateItemButton onClick={openModal} />

            <CreateTransactionModal
                isOpen={isModalOpen}
                refetchTransactionList={refetchTransactionList}
                onClose={closeModal}
            />
        </>
    );
}
