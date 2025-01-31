import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import EditTransactionModal from 'features/transaction-form-modal/components/edit-transaction-modal/EditTransactionModal';
import FromToTransactionDetails from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails';
import TransactionCardFooter from 'features/transaction-list/components/transaction-card/TransactionCardFooter';
import TransactionCardHeader from 'features/transaction-list/components/transaction-card/TransactionCardHeader';
import TransactionDetailsModal from 'features/transaction-list/components/transaction-details-modal/TransactionDetailsModal';
import { useModal } from 'hooks/useModal';
import { Transaction } from 'types/generated.types';

interface ITransactionCardProps {
    transaction: Transaction;
}

export default function TransactionCard({
    transaction,
}: ITransactionCardProps): JSX.Element {
    const {
        isModalOpen: isDetailsModalOpen,
        openModal: openDetailsModal,
        closeModal: closeDetailsModal,
    } = useModal();

    const {
        isModalOpen: isEditModalOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
    } = useModal();

    return (
        <>
            <Card>
                <TransactionCardHeader
                    transaction={transaction}
                    openDetailsModal={openDetailsModal}
                    openEditModal={openEditModal}
                />

                <CardContent>
                    <FromToTransactionDetails transaction={transaction} />
                </CardContent>

                <TransactionCardFooter description={transaction.description} />
            </Card>

            <TransactionDetailsModal
                transaction={transaction}
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
            />

            <EditTransactionModal
                transaction={transaction}
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
            />
        </>
    );
}
