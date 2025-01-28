import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import Card from 'components/card/Card';
import CardContent from 'components/card/CardContent';
import CardHeader from 'components/card/CardHeader';
import CardTitle from 'components/card/CardTitle';
import Typography from 'components/typography/Typography';
import EditTransactionModal from 'features/transaction-form-modal/components/edit-transaction-modal/EditTransactionModal';
import FromToTransactionDetails from 'features/transaction-list/components/from-to-transaction-details/FromToTransactionDetails';
import HeaderChips from 'features/transaction-list/components/header-chips/HeaderChips';
import styles from 'features/transaction-list/components/transaction-card/TransactionCard.module.scss';
import TransactionCardFooter from 'features/transaction-list/components/transaction-card/TransactionCardFooter';
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

    const { type, createdAt, value, currency, fee } = transaction;

    return (
        <>
            <Card>
                <CardHeader
                    title={
                        <div className={styles['header-title-wrapper']}>
                            <HeaderChips createdAt={createdAt} type={type} />

                            <CardTitle title={`${value} ${currency}`} />

                            {fee && (
                                <Typography
                                    variant="body2"
                                    className={styles.fee}
                                >
                                    Fee: {`${fee} ${currency}`}
                                </Typography>
                            )}
                        </div>
                    }
                    actions={
                        <BaseEntityMenu
                            openDetailsModal={openDetailsModal}
                            openEditModal={openEditModal}
                        />
                    }
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
