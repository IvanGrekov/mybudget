import EmptyState from 'components/empty-state/EmptyState';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { useTransactionListCurrentTypesFilterValue } from 'features/transaction-list/hooks/transactionListFilters.hooks';

export default function TransactionListEmptyState(): JSX.Element {
    const { value: types } = useTransactionListCurrentTypesFilterValue();

    if (types.length === DEFAULT_TRANSACTION_TYPES.length) {
        return <EmptyState text="No transactions found" />;
    }

    return (
        <EmptyState
            text={`No ${types
                .map((type) => `'${type}'`)
                .join(', ')} transactions found`}
        />
    );
}
