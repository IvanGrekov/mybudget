import LinearProgress from 'components/linear-progress/LinearProgress';
import Select from 'components/select/Select';
import { TRANSACTION_LIST_CATEGORY_FILTER_PARAM_NAME } from 'features/transaction-list/constants/transactionListFilterParams.constants';
import { useTransactionListCurrentCategoryFilterValue } from 'features/transaction-list/hooks/transactionListFilters.hooks';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useGetAllTransactionCategories } from 'hooks/useGetAllTransactionCategories';
import { TransactionCategory } from 'types/generated.types';

export default function TransactionsCategoryFilter(): JSX.Element | null {
    const { transactionCategories, isLoading } =
        useGetAllTransactionCategories();
    const categoryId = useTransactionListCurrentCategoryFilterValue();
    const setCategoryId = useGetSetSearchParamsValue();

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!transactionCategories?.length) {
        return null;
    }

    const value =
        transactionCategories.find((category) => category.id === categoryId) ||
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
            label="Category"
            isFullWidth={true}
            getOptionLabel={(option) => option.name}
        />
    );
}
