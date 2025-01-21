import LinearProgress from 'components/linear-progress/LinearProgress';
import Select from 'components/select/Select';
import { TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME } from 'features/transaction-list/constants/transactionListFilterParams.constants';
import { useTransactionListCurrentAccountFilterValue } from 'features/transaction-list/hooks/transactionListFilters.hooks';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useGetAllAccounts } from 'hooks/useGetAllAccounts';
import { Account } from 'types/generated.types';

export default function TransactionsAccountFilter(): JSX.Element | null {
    const { accounts, isLoading } = useGetAllAccounts();
    const accountId = useTransactionListCurrentAccountFilterValue();
    const setAccountId = useGetSetSearchParamsValue();

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!accounts?.length) {
        return null;
    }

    const value = accounts.find((account) => account.id === accountId) || null;

    const onChange = (option: Account | null): void => {
        const value = option ? String(option.id) : '';
        setAccountId(TRANSACTION_LIST_ACCOUNT_FILTER_PARAM_NAME, value);
    };

    return (
        <Select
            value={value}
            options={accounts}
            onChange={onChange}
            label="Account"
            isFullWidth={true}
            getOptionLabel={(option) => option.name}
        />
    );
}
