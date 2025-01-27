import {
    TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
    TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
} from 'features/transaction-list/constants/transactionListFilterParams.constants';
import { useTransactionListFilterValues } from 'features/transaction-list/hooks/transactionListFilters.hooks';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';

interface IUseClearTransactionsFiltersResult {
    shouldShowClearFiltersButton: boolean;
    clearFilters: VoidFunction;
}

export const useClearTransactionsFilters =
    (): IUseClearTransactionsFiltersResult => {
        const { isDefaultTypesSelected, accountId, categoryId, from, to } =
            useTransactionListFilterValues();
        const setSearchParamsValue = useGetSetSearchParamsValue();

        const shouldShowClearFiltersButton = Boolean(
            !isDefaultTypesSelected || accountId || categoryId || from || to,
        );

        const clearFilters = (): void => {
            setSearchParamsValue({
                [TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME]: '',
                [TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME]: '',
                [TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME]: '',
                [TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME]: '',
                [TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME]: '',
            });
        };

        return { shouldShowClearFiltersButton, clearFilters };
    };
