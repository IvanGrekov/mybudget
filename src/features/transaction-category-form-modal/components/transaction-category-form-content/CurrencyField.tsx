import FormSelectField from 'components/form-fields/FormSelectField';
import {
    TRANSACTION_CATEGORY_FORM_FIELD_NAMES,
    TRANSACTION_CATEGORY_FORM_FIELD_LABELS,
} from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import { CreateTransactionCategoryDtoCurrencyEnum } from 'types/generated.types';

const OPTIONS = Object.values(CreateTransactionCategoryDtoCurrencyEnum);

export default function CurrencyField(): JSX.Element {
    return (
        <FormSelectField
            name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.currency}
            label={TRANSACTION_CATEGORY_FORM_FIELD_LABELS.currency}
            options={OPTIONS}
            isClearable={false}
            required={true}
        />
    );
}
