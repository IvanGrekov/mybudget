import FormSelectField from 'components/form-fields/FormSelectField';
import { TRANSACTION_CATEGORY_FORM_FIELD_NAMES } from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import { useGetTransactionCategoryFormFeatureTranslations } from 'hooks/translations.hooks';
import { EditTransactionCategoryDtoStatusEnum } from 'types/generated.types';
import { getCapitalizedString } from 'utils/string.utils';

const OPTIONS = Object.values(EditTransactionCategoryDtoStatusEnum);

export default function StatusField(): JSX.Element {
    const label = useGetTransactionCategoryFormFeatureTranslations()('status');

    return (
        <FormSelectField
            name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.status}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) => getCapitalizedString(option)}
        />
    );
}
