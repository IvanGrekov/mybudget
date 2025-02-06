import HeaderChip from 'components/header-chip/HeaderChip';
import CreateTransactionButton from 'features/transaction-form-modal/components/create-transaction-button/CreateTransactionButton';
import styles from 'styles/ItemList.module.scss';

interface ITransactionListHeaderProps {
    refetchTransactionList: VoidFunction;
}

export default function TransactionListHeader({
    refetchTransactionList,
}: ITransactionListHeaderProps): JSX.Element {
    return (
        <div className={styles.header}>
            <HeaderChip title="Transactions" />

            <CreateTransactionButton
                refetchTransactionList={refetchTransactionList}
            />
        </div>
    );
}
