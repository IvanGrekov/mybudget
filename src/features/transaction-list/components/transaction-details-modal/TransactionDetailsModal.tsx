import { Suspense, lazy } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { ITransactionDetailsModalDataProps } from 'features/transaction-list/components/transaction-details-modal/types/transactionDetailsModalDataProps';

const TransactionDetailsModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-list/components/transaction-details-modal/TransactionDetailsModalContent'
        ),
);

export default function TransactionDetailsModal({
    transaction,
    isOpen,
    onClose,
}: IModalBaseProps & ITransactionDetailsModalDataProps): JSX.Element {
    return (
        <Modal
            isOpen={isOpen}
            title="Transaction Details"
            size="medium"
            onClose={onClose}
        >
            <Suspense fallback={<ModalCircularLoading />}>
                <TransactionDetailsModalContentLazy transaction={transaction} />
            </Suspense>
        </Modal>
    );
}
