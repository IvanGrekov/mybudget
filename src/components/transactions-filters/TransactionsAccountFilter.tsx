import LinearProgress from 'components/linear-progress/LinearProgress';
import Select from 'components/select/Select';
import { ITransactionsFiltersProps } from 'components/transactions-filters/types/transactionsFiltersProps';
import { TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME } from 'constants/transactionListFilterParams.constants';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useTransactionListCurrentAccountFilterValue } from 'hooks/transactionListFilters.hooks';
import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import { Account } from 'types/generated.types';

export default function TransactionsAccountFilter({
    selectedAccountId,
}: Pick<ITransactionsFiltersProps, 'selectedAccountId'>): JSX.Element | null {
    const { accounts, isLoading } = useGetAllAccounts();
    const accountId = useTransactionListCurrentAccountFilterValue();
    const setAccountId = useGetSetSearchParamsValue();

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!accounts?.length) {
        return null;
    }

    const isSelectedAccountIdValid = typeof selectedAccountId !== 'undefined';
    const filterValue = isSelectedAccountIdValid
        ? selectedAccountId
        : accountId;

    const value =
        accounts.find((account) => account.id === filterValue) || null;

    const onChange = (option: Account | null): void => {
        const value = option ? String(option.id) : '';
        setAccountId({ [TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME]: value });
    };

    return (
        <Select
            value={value}
            options={accounts}
            onChange={onChange}
            label="Account"
            isFullWidth={true}
            getOptionLabel={(option) => option.name}
            disabled={isSelectedAccountIdValid}
        />
    );
}
