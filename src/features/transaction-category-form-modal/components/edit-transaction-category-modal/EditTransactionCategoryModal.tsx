import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { IEditTransactionCategoryModalDataProps } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/types/editTransactionCategoryModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';

const EditTransactionCategoryModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModalContent'
        ),
);

export default function EditTransactionCategoryModal({
    transactionCategory,
    parentId,
    hasChildren,
    isOpen,
    onClose,
}: IModalBaseProps & IEditTransactionCategoryModalDataProps): JSX.Element {
    const onCloseModal = useFormModalCloseConfirmation(onClose);

    return (
        <Modal
            isOpen={isOpen}
            title={`Edit "${transactionCategory.name}" Category`}
            size="small"
            onClose={onCloseModal}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <EditTransactionCategoryModalContentLazy
                    transactionCategory={transactionCategory}
                    parentId={parentId}
                    hasChildren={hasChildren}
                    hideModal={onClose}
                    onCloseModal={onCloseModal}
                />
            </Suspense>
        </Modal>
    );
}
