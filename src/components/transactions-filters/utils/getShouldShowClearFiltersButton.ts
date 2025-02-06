import { ITransactionListFilterValues } from 'types/transactionListFilterValues';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';

export const getShouldShowClearFiltersButton = ({
    selectedAccountId,
    selectedCategoryId,
    isDefaultTypesSelected,
    accountId,
    categoryId,
    from,
    to,
}: ITransactionsFiltersArgs & ITransactionListFilterValues): boolean => {
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
