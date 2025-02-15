import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { TDeleteTransactionCategoryModalDataProps } from 'features/delete-transaction-category-modal/types/deleteTransactionCategoryModalDataProps';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

const DeleteTransactionCategoryModalContentLazy = lazy(
    () =>
        import(
            'features/delete-transaction-category-modal/components/delete-transaction-category-modal-content/DeleteTransactionCategoryModalContent'
        ),
);

export default function DeleteTransactionCategoryModal({
    isOpen,
    parentId,
    onClose,
    ...dataProps
}: IModalBaseProps & TDeleteTransactionCategoryModalDataProps): JSX.Element {
    const [deleteCategoryTitle, deleteSubcategoryTitle] =
        useGetFeatureTranslations({
            featureName: 'DeleteEntity',
            keys: ['delete_transaction_category', 'delete_subcategory'],
        });

    return (
        <Modal
            isOpen={isOpen}
            title={parentId ? deleteSubcategoryTitle : deleteCategoryTitle}
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
