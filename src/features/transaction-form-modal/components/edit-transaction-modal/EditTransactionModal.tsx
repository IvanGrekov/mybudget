import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { IEditTransactionModalDataProps } from 'features/transaction-form-modal/components/edit-transaction-modal/types/editTransactionModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';

const EditTransactionModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-form-modal/components/edit-transaction-modal/EditTransactionModalContent'
        ),
);

export default function EditTransactionModal({
    transaction,
    isOpen,
    onClose,
}: IModalBaseProps & IEditTransactionModalDataProps): JSX.Element {
    const onCloseModal = useFormModalCloseConfirmation(onClose);

    return (
        <Modal
            isOpen={isOpen}
            title="Edit Transaction"
            size="medium"
            onClose={onCloseModal}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <EditTransactionModalContentLazy
                    transaction={transaction}
                    hideModal={onClose}
                    onCloseModal={onCloseModal}
                />
            </Suspense>
        </Modal>
    );
}
