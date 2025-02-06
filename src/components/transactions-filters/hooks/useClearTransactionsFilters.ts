import { getShouldShowClearFiltersButton } from 'components/transactions-filters/utils/getShouldShowClearFiltersButton';
import {
    TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME,
    TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME,
    TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME,
    TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME,
} from 'constants/transactionListFilterParams.constants';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useTransactionListFilterValues } from 'hooks/transactionListFilters.hooks';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';

interface IUseClearTransactionsFiltersResult {
    shouldShowClearFiltersButton: boolean;
    clearFilters: VoidFunction;
}

export const useClearTransactionsFilters = ({
    selectedAccountId,
    selectedCategoryId,
}: ITransactionsFiltersArgs): IUseClearTransactionsFiltersResult => {
    const transactionListFilterValues = useTransactionListFilterValues();
    const setSearchParamsValue = useGetSetSearchParamsValue();

    const shouldShowClearFiltersButton = getShouldShowClearFiltersButton({
        selectedAccountId,
        selectedCategoryId,
        ...transactionListFilterValues,
    });

    const clearFilters = (): void => {
        const clearingParams: Record<string, string> = {
            [TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME]: '',
            [TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME]: '',
            [TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME]: '',
            [TRANSACTION_LIST_DATE_RANGE_FROM_FILTER_PARAM_NAME]: '',
            [TRANSACTION_LIST_DATE_RANGE_TO_FILTER_PARAM_NAME]: '',
        };

        if (typeof selectedAccountId !== 'undefined') {
            delete clearingParams[TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME];
        }

        if (typeof selectedCategoryId !== 'undefined') {
            delete clearingParams[TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME];
        }

        setSearchParamsValue(clearingParams);
    };

    return { shouldShowClearFiltersButton, clearFilters };
};
