import { ITransactionsFiltersProps } from 'components/transactions-filters/types/transactionsFiltersProps';
import { ITransactionListFilterValues } from 'types/transactionListFilterValues';

export const getShouldShowClearFiltersButton = ({
    selectedAccountId,
    selectedCategoryId,
    isDefaultTypesSelected,
    accountId,
    categoryId,
    from,
    to,
}: ITransactionsFiltersProps & ITransactionListFilterValues): boolean => {
    if (typeof selectedAccountId !== 'undefined') {
        return Boolean(!isDefaultTypesSelected || categoryId || from || to);
    }

    if (typeof selectedCategoryId !== 'undefined') {
        return Boolean(!isDefaultTypesSelected || accountId || from || to);
    }

    return Boolean(
        !isDefaultTypesSelected || accountId || categoryId || from || to,
    );
};
