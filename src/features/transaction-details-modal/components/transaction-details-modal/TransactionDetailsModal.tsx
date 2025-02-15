import { Suspense, lazy } from 'react';

import Modal from 'components/modal/Modal';
import ModalCircularLoading from 'components/modal/ModalCircularLoading';
import { IModalBaseProps } from 'components/modal/types/modalProps';
import { ITransactionDetailsModalDataProps } from 'features/transaction-details-modal/components/transaction-details-modal/types/transactionDetailsModalDataProps';
import { useGetTransactionsFeatureTranslations } from 'hooks/translations.hooks';

const TransactionDetailsModalContentLazy = lazy(
    () =>
        import(
            'features/transaction-details-modal/components/transaction-details-modal/TransactionDetailsModalContent'
        ),
);

export default function TransactionDetailsModal({
    transaction,
    isOpen,
    onClose,
}: IModalBaseProps & ITransactionDetailsModalDataProps): JSX.Element {
    const title = useGetTransactionsFeatureTranslations()(
        'transaction_details',
    );

    return (
        <Modal isOpen={isOpen} title={title} size="medium" onClose={onClose}>
            <Suspense fallback={<ModalCircularLoading />}>
                <TransactionDetailsModalContentLazy transaction={transaction} />
            </Suspense>
        </Modal>
    );
}
