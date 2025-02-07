import Select from 'components/select/Select';
import { DEFAULT_TRANSACTION_TYPES } from 'constants/defaultTransactionTypes';
import { TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME } from 'constants/transactionListFilterParams.constants';
import { useGetSetSearchParamsValue } from 'hooks/searchParams.hooks';
import { useTransactionListCurrentTypesFilterValue } from 'hooks/transactionListFilters.hooks';
import { TransactionTypeEnum } from 'types/generated.types';
import { combineMultipleValuesSearchParam } from 'utils/searchParams.utils';
import { getCapitalizedEnumValue } from 'utils/string.utils';

const OPTIONS = Object.values(TransactionTypeEnum);

export default function TransactionsTypesFilter(): JSX.Element {
    const { value: types } = useTransactionListCurrentTypesFilterValue();
    const setTypes = useGetSetSearchParamsValue();

    const onChange = (option: TransactionTypeEnum | null): void => {
        let newTypes = types;

        if (!option) {
            newTypes = DEFAULT_TRANSACTION_TYPES;
        } else {
            if (newTypes.includes(option)) {
                newTypes = newTypes.filter((type) => type !== option);
            } else {
                newTypes = [...newTypes, option];
            }
        }

        const value =
            !newTypes.length || newTypes.length === OPTIONS.length
                ? ''
                : combineMultipleValuesSearchParam(newTypes);

        setTypes({ [TRANSACTION_LIST_TYPES_FILTER_PARAM_NAME]: value });
    };

    return (
        <Select
            value={types}
            options={OPTIONS}
            multiple={true}
            onChange={onChange}
            label="Type"
            getOptionLabel={(option) => getCapitalizedEnumValue(option)}
            isClearable={false}
            isFullWidth={true}
        />
    );
}
