import EmptyState from 'components/empty-state/EmptyState';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { useTransactionListCurrentFilterValue } from 'features/transaction-list/hooks/useTransactionListCurrentFilterValue';

export default function TransactionListEmptyState(): JSX.Element {
    const types = useTransactionListCurrentFilterValue();

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
