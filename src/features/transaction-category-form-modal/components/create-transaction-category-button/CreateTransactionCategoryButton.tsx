import CreateItemButton from 'components/create-item-button/CreateItemButton';
import { MAX_TRANSACTION_CATEGORIES_PER_USER } from 'constants/maxTransactionCategoriesPerUser';
import CreateTransactionCategoryModal from 'features/transaction-category-form-modal/components/create-transaction-category-modal/CreateTransactionCategoryModal';
import { useModal } from 'hooks/useModal';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

interface ICreateTransactionCategoryButtonProps {
    currentTransactionCategoriesLength: number;
    defaultTransactionCategoryType: TransactionCategoryTypeEnum;
}

export default function CreateTransactionCategoryButton({
    currentTransactionCategoriesLength,
    defaultTransactionCategoryType,
}: ICreateTransactionCategoryButtonProps): JSX.Element {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <CreateItemButton
                isDisabled={
                    currentTransactionCategoriesLength >=
                    MAX_TRANSACTION_CATEGORIES_PER_USER
                }
                onClick={openModal}
            />

            <CreateTransactionCategoryModal
                defaultTransactionCategoryType={defaultTransactionCategoryType}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}
