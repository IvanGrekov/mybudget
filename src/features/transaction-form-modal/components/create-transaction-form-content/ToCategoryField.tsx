import EntityOptionItem from 'components/entity-option-item/EntityOptionItem';
import FormSelectField from 'components/form-fields/FormSelectField';
import LinearProgress from 'components/linear-progress/LinearProgress';
import { getTransactionCategoryOptions } from 'features/transaction-form-modal/components/create-transaction-form-content/utils/getTransactionCategoryOptions';
import { TRANSACTION_FORM_FIELD_NAMES } from 'features/transaction-form-modal/constants/transactionForm.constants';
import { useGetTransactionFormFeatureTranslations } from 'hooks/translations.hooks';
import { useGetTransactionCategories } from 'hooks/useGetTransactionCategories';
import { TransactionCategoryTypeEnum } from 'types/generated.types';

export default function ToCategoryField(): JSX.Element | null {
    const { transactionCategories, isLoading } = useGetTransactionCategories(
        TransactionCategoryTypeEnum.EXPENSE,
    );

    const label = useGetTransactionFormFeatureTranslations()('to_category');

    if (isLoading) {
        return <LinearProgress />;
    }

    if (!transactionCategories) {
        return null;
    }

    const options = getTransactionCategoryOptions(transactionCategories);

    return (
        <FormSelectField
            name={TRANSACTION_FORM_FIELD_NAMES.toCategory}
            label={label}
            options={options}
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
