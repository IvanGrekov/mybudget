import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { IEditTransactionCategoryModalDataProps } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/types/editTransactionCategoryModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

const EditTransactionCategoryModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-category-form-modal/components/edit-transaction-category-modal/EditTransactionCategoryModalContent'
        ),
);

export default function EditTransactionCategoryModal({
    transactionCategory,
    isOpen,
    onClose,
    ...props
}: IModalBaseProps & IEditTransactionCategoryModalDataProps): JSX.Element {
    const onCloseModal = useFormModalCloseConfirmation(onClose);

    const [title] = useGetFeatureTranslations({
        featureName: 'EditEntity',
        keys: ['edit_transaction_category'],
    });

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            size="medium"
            onClose={onCloseModal}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <EditTransactionCategoryModalContentLazy
                    transactionCategory={transactionCategory}
                    hideModal={onClose}
                    onCloseModal={onCloseModal}
                    {...props}
                />
            </Suspense>
        </Modal>
    );
}
