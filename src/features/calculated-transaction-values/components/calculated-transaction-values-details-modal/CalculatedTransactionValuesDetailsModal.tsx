import { lazy, Suspense } from 'react';

import CancelAction from 'components/confirmation-modal/CancelAction';
import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { ICalculatedTransactionValuesDetailsModalData } from 'features/calculated-transaction-values/components/calculated-transaction-values-details-modal/types/calculatedTransactionValuesDetailsModalData';

const CalculatedTransactionValuesDetailsModalContentLazy = lazy(
    () =>
        import(
            'features/calculated-transaction-values/components/calculated-transaction-values-details-modal/CalculatedTransactionValuesDetailsModalContent'
        ),
);

export default function CalculatedTransactionValuesDetailsModal({
    entityName,
    isOpen,
    onClose,
    ...rest
}: ICalculatedTransactionValuesDetailsModalData &
    IModalBaseProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title={entityName}
            size="medium"
            actions={<CancelAction onCancel={onClose} />}
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <CalculatedTransactionValuesDetailsModalContentLazy {...rest} />
            </Suspense>
        </Modal>
    );
}
