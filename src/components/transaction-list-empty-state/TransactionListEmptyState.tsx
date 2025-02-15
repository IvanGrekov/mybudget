import EmptyState from 'components/empty-state/EmptyState';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { useTransactionListCurrentTypesFilterValue } from 'hooks/transactionListFilters.hooks';
import {
    useGetEntityNameTranslations,
    useGetEmptyStateTranslations,
} from 'hooks/translations.hooks';
import { getCapitalizedEnumValue } from 'utils/string.utils';

interface ITransactionListEmptyStateProps {
    isRelatedTransactionList?: boolean;
}

export default function TransactionListEmptyState({
    isRelatedTransactionList,
}: ITransactionListEmptyStateProps): JSX.Element {
    const { value: types } = useTransactionListCurrentTypesFilterValue();
    const entityNameTranslations = useGetEntityNameTranslations();
    const emptyStateTranslations = useGetEmptyStateTranslations();

    const transactionsModel = isRelatedTransactionList
        ? entityNameTranslations('related_transactions')
        : entityNameTranslations('transactions');
    const notFoundText = emptyStateTranslations('not_found');

    if (types.length === DEFAULT_TRANSACTION_TYPES.length) {
        return <EmptyState text={`${transactionsModel} ${notFoundText}`} />;
    }

    return (
        <EmptyState
            text={`${types
                .map(
                    (type) =>
                        `'${getCapitalizedEnumValue(
                            type,
                            entityNameTranslations,
                        )}'`,
                )
                .join(', ')} ${transactionsModel} ${notFoundText}`}
        />
    );
}
