import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TDeleteTransactionCategoryModalDataProps } from 'features/transaction-category-list/components/delete-transaction-category-modal/types/deleteTransactionCategoryModalDataProps';

const DeleteTransactionCategoryModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-category-list/components/delete-transaction-category-modal/DeleteTransactionCategoryModalContent'
        ),
);

export default function DeleteTransactionCategoryModal({
    isOpen,
    parentId,
    onClose,
    ...dataProps
}: IModalBaseProps & TDeleteTransactionCategoryModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title={`Confirm ${parentId ? 'Subcategory' : 'Category'} Deleting`}
            size="small"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <DeleteTransactionCategoryModalContentLazy
                    {...dataProps}
                    parentId={parentId}
                    onClose={onClose}
                />
            </Suspense>
        </Modal>
    );
}
