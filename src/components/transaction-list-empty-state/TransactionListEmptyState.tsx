import EmptyState from 'components/empty-state/EmptyState';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { useTransactionListCurrentTypesFilterValue } from 'hooks/transactionListFilters.hooks';

interface ITransactionListEmptyStateProps {
    isRelatedTransactionList?: boolean;
}

export default function TransactionListEmptyState({
    isRelatedTransactionList,
}: ITransactionListEmptyStateProps): JSX.Element {
    const { value: types } = useTransactionListCurrentTypesFilterValue();

    const transactionsModel = isRelatedTransactionList
        ? 'related transactions'
        : 'transactions';

    if (types.length === DEFAULT_TRANSACTION_TYPES.length) {
        return <EmptyState text={`No ${transactionsModel} found`} />;
    }

    return (
        <EmptyState
            text={`No ${types
                .map((type) => `'${type}'`)
                .join(', ')} ${transactionsModel} found`}
        />
    );
}
