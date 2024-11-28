import FormSelectField from 'components/form-fields/FormSelectField';
import {
    TRANSACTION_CATEGORY_FORM_FIELD_NAMES,
    TRANSACTION_CATEGORY_FORM_FIELD_LABELS,
} from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import { CreateTransactionCategoryDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedString } from 'utils/string.utils';

const OPTIONS = Object.values(CreateTransactionCategoryDtoTypeEnum);

export default function TypeField(): JSX.Element {
    return (
        <FormSelectField
            name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.type}
            label={TRANSACTION_CATEGORY_FORM_FIELD_LABELS.type}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) => getCapitalizedString(option, '_')}
        />
    );
}
