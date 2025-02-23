'use client';

import { useRouter } from 'next/navigation';

import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import { TAB_PARAM_NAME } from 'constants/tabParamName';
import ChangeTransactionCategoryCurrencyModal from 'features/change-transaction-category-currency-modal/components/change-transaction-category-currency-modal/ChangeTransactionCategoryCurrencyModal';
import DeleteTransactionCategoryModal from 'features/delete-transaction-category-modal/components/delete-transaction-category-modal/DeleteTransactionCategoryModal';
import EditTransactionCategoryModal from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModal';
import { useModal } from 'hooks/useModal';
import { EAppRoutes } from 'types/appRoutes';
import { TransactionCategory } from 'types/generated.types';

interface ITransactionCategoryMenuProps {
    transactionCategory: TransactionCategory;
}

export default function TransactionCategoryMenu({
    transactionCategory,
}: ITransactionCategoryMenuProps): JSX.Element {
    const { push } = useRouter();

    const { id, type, name, currency, children } = transactionCategory;

    const onDeactivate = (): void => {
        push(`${EAppRoutes.TransactionCategories}?${TAB_PARAM_NAME}=${type}`);
    };

    const {
        isModalOpen: isEditModalOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
    } = useModal();
    const {
        isModalOpen: isChangeCurrencyModalOpen,
        openModal: openChangeCurrencyModal,
        closeModal: closeChangeCurrencyModal,
    } = useModal();
    const {
        isModalOpen: isDeleteModalOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal();

    return (
        <>
            <BaseEntityMenu
                openEditModal={openEditModal}
                openChangeCurrencyModal={openChangeCurrencyModal}
                openDeleteModal={openDeleteModal}
            />

            <EditTransactionCategoryModal
                transactionCategory={transactionCategory}
                hasChildren={!!children?.length}
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
            />

            <ChangeTransactionCategoryCurrencyModal
                id={id}
                type={type}
                name={name}
                currency={currency}
                isOpen={isChangeCurrencyModalOpen}
                onClose={closeChangeCurrencyModal}
            />

            <DeleteTransactionCategoryModal
                id={id}
                type={type}
                name={name}
                hasChildren={!!children?.length}
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onCompleted={onDeactivate}
            />
        </>
    );
}
