import HeaderChip from 'components/header-chip/HeaderChip';
import CreateTransactionButton from 'features/transaction-form-modal/components/create-transaction-button/CreateTransactionButton';
import styles from 'styles/ItemList.module.scss';

export default function TransactionListHeader(): JSX.Element {
    return (
        <div className={styles.header}>
            <HeaderChip title="Transactions" />

            {/* TODO: Pass selected filter value */}
            <CreateTransactionButton />
        </div>
    );
}
