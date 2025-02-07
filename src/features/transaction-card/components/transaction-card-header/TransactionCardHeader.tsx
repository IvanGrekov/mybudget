import BaseEntityMenu from 'components/base-entity-menu/BaseEntityMenu';
import CardHeader from 'components/card/CardHeader';
import TransactionCardAdditionalInfo from 'components/transaction-card-additional-info/TransactionCardAdditionalInfo';
import TransactionCardHeaderChips from 'components/transaction-card-header-chips/TransactionCardHeaderChips';
import Typography from 'components/typography/Typography';
import styles from 'features/transaction-card/components/transaction-card-header/TransactionCardHeader.module.scss';
import { Transaction } from 'types/generated.types';
import { roundValue } from 'utils/roundValue';

interface ITransactionCardHeaderProps {
    transaction: Transaction;
    openDetailsModal: VoidFunction;
    openEditModal: VoidFunction;
}

export default function TransactionCardHeader({
    transaction,
    openDetailsModal,
    openEditModal,
}: ITransactionCardHeaderProps): JSX.Element {
    const { createdAt, type, value, currency } = transaction;

    return (
        <CardHeader
            title={
                <div className={styles['header-title-wrapper']}>
                    <TransactionCardHeaderChips
                        createdAt={createdAt}
                        type={type}
                    />

                    <Typography variant="subtitle1" element="h3">
                        {roundValue(value)} {currency}
                    </Typography>

                    <TransactionCardAdditionalInfo transaction={transaction} />
                </div>
            }
            actions={
                <BaseEntityMenu
                    openDetailsModal={openDetailsModal}
                    openEditModal={openEditModal}
                />
            }
        />
    );
}
