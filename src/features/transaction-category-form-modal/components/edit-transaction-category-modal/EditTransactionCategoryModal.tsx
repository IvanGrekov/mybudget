import { Suspense } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import UnderDevelopmentMessage from 'components/under-development-message/UnderDevelopmentMessage';
import { IEditTransactionCategoryModalDataProps } from 'features/transaction-category-form-modal/components/edit-transaction-category-modal/types/editTransactionCategoryModalDataProps';

export default function EditTransactionCategoryModal({
    isOpen,
    onClose,
}: IModalBaseProps & IEditTransactionCategoryModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Edit Category"
            size="small"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <UnderDevelopmentMessage />
            </Suspense>
        </Modal>
    );
}
