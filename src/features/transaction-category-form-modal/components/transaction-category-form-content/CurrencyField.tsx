import FormSelectField from 'components/form-fields/FormSelectField';
import { TRANSACTION_CATEGORY_FORM_FIELD_NAMES } from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import { useGetTransactionCategoryFormFeatureTranslations } from 'hooks/translations.hooks';
import { CreateTransactionCategoryDtoCurrencyEnum } from 'types/generated.types';

const OPTIONS = Object.values(CreateTransactionCategoryDtoCurrencyEnum);

export default function CurrencyField(): JSX.Element {
    const label =
        useGetTransactionCategoryFormFeatureTranslations()('currency');

    return (
        <FormSelectField
            name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.currency}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
        />
    );
}
