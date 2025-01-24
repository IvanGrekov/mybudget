import Accordion from 'components/accordion/Accordion';
import TransactionsAccountFilter from 'features/transaction-list/components/transactions-filters/TransactionsAccountFilter';
import TransactionsCategoryFilter from 'features/transaction-list/components/transactions-filters/TransactionsCategoryFilter';
import TransactionsDateRangeFilter from 'features/transaction-list/components/transactions-filters/TransactionsDateRangeFilter';
import styles from 'features/transaction-list/components/transactions-filters/TransactionsFilters.module.scss';
import TransactionsTypesFilter from 'features/transaction-list/components/transactions-filters/TransactionsTypesFilter';

export default function TransactionsFilters(): JSX.Element {
    return (
        <Accordion title="Transactions Filtering">
            <div className={styles.filters}>
                <TransactionsTypesFilter />
                <TransactionsAccountFilter />
                <TransactionsCategoryFilter />
                <TransactionsDateRangeFilter />
            </div>
        </Accordion>
    );
}
