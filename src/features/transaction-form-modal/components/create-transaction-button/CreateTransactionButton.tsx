import CreateItemButton from 'components/create-item-button/CreateItemButton';
import CreateTransactionModal from 'features/transaction-form-modal/components/create-transaction-modal/CreateTransactionModal';
import { useModal } from 'hooks/useModal';

export default function CreateTransactionButton(): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    // TODO: Get selected filter value
    return (
        <>
            <CreateItemButton onClick={openModal} />

            <CreateTransactionModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}
