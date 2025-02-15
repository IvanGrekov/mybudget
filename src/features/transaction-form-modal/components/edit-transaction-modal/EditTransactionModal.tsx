import { lazy, Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { IEditTransactionModalDataProps } from 'features/transaction-form-modal/components/edit-transaction-modal/types/editTransactionModalDataProps';
import { useFormModalCloseConfirmation } from 'hooks/formModalCloseConfirmation.hooks';
import { useGetFeatureTranslations } from 'hooks/translations.hooks';

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

    const [title] = useGetFeatureTranslations({
        featureName: 'EditEntity',
        keys: ['edit_transaction'],
    });

    return (
        <Modal
            isOpen={isOpen}
            title={title}
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
