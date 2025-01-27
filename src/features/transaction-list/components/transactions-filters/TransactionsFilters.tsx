import Accordion from 'components/accordion/Accordion';
import Button from 'components/button/Button';
import Show from 'components/show/Show';
import TransactionsAccountFilter from 'features/transaction-list/components/transactions-filters/TransactionsAccountFilter';
import TransactionsCategoryFilter from 'features/transaction-list/components/transactions-filters/TransactionsCategoryFilter';
import TransactionsDateRangeFilter from 'features/transaction-list/components/transactions-filters/TransactionsDateRangeFilter';
import styles from 'features/transaction-list/components/transactions-filters/TransactionsFilters.module.scss';
import TransactionsTypesFilter from 'features/transaction-list/components/transactions-filters/TransactionsTypesFilter';
import { useClearTransactionsFilters } from 'features/transaction-list/components/transactions-filters/hooks/useClearTransactionsFilters';

export default function TransactionsFilters(): JSX.Element {
    const { shouldShowClearFiltersButton, clearFilters } =
        useClearTransactionsFilters();

    return (
        <Accordion title="Transactions Filtering">
            <div className={styles.filters}>
                <TransactionsTypesFilter />
                <TransactionsAccountFilter />
                <TransactionsCategoryFilter />
                <TransactionsDateRangeFilter />

                <Show when={!!shouldShowClearFiltersButton}>
                    <Button
                        variant="contained"
                        text="Clear filters"
                        onClick={clearFilters}
                    />
                </Show>
            </div>
        </Accordion>
    );
}
