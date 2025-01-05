import EntityOptionItem from 'components/entity-option-item/EntityOptionItem';
import FormSelectField from 'components/form-fields/FormSelectField';
import LinearProgress from 'components/linear-progress/LinearProgress';
import {
    CREATE_TRANSACTION_FORM_FIELD_NAMES,
    CREATE_TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/createTransactionForm.constants';
import { useGetTransactionCategories } from 'hooks/useGetTransactionCategories';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

export default function FromCategoryField(): JSX.Element | null {
    const { transactionCategories, isLoading } = useGetTransactionCategories(
        TransactionCategoryTypeEnum.INCOME,
    );

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!transactionCategories) {
        return null;
    }

    return (
        <FormSelectField
            name={CREATE_TRANSACTION_FORM_FIELD_NAMES.fromCategory}
            label={CREATE_TRANSACTION_FORM_FIELD_LABELS.fromCategory}
            options={transactionCategories}
            isClearable={true}
            shouldAddSearch={true}
            getOptionLabel={(option) => option.name}
            getOptionReactNode={({ name, currency, iconName, iconColor }) => (
                <EntityOptionItem
                    name={name}
                    currency={currency}
                    iconName={iconName}
                    iconColor={iconColor}
                />
            )}
        />
    );
}
