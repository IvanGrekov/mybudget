import LinearProgress from 'components/linear-progress/LinearProgress';
import Select from 'components/select/Select';
import { TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME } from 'constants/transactionListFilterParams.constants';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useTransactionListCurrentCategoryFilterValue } from 'hooks/transactionListFilters.hooks';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { useGetAllTransactionCategories } from 'hooks/useGetAllTransactionCategories';
import { TransactionCategory } from 'types/generated.types';
import { ITransactionsFiltersArgs } from 'types/transactionsFiltersArgs';

export default function TransactionsCategoryFilter({
    selectedCategoryId,
}: Pick<ITransactionsFiltersArgs, 'selectedCategoryId'>): JSX.Element | null {
    const { transactionCategories, isLoading } =
        useGetAllTransactionCategories();
    const categoryId = useTransactionListCurrentCategoryFilterValue();
    const setCategoryId = useGetSetSearchParamsValue();

    const label = useGetEntityNameTranslations()('transaction_category');

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!transactionCategories?.length) {
        return null;
    }

    const isSelectedCategoryIdValid = typeof selectedCategoryId !== 'undefined';
    const filterValue = isSelectedCategoryIdValid
        ? selectedCategoryId
        : categoryId;

    const value =
        transactionCategories.find((category) => category.id === filterValue) ||
        null;

    const onChange = (option: TransactionCategory | null): void => {
        const value = option ? String(option.id) : '';
        setCategoryId({ [TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME]: value });
    };

    return (
        <Select
            value={value}
            options={transactionCategories}
            onChange={onChange}
            label={label}
            isFullWidth={true}
            getOptionLabel={(option) => option.name}
            disabled={isSelectedCategoryIdValid}
        />
    );
}
