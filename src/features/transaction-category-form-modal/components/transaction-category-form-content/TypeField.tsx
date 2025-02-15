import FormSelectField from 'components/form-fields/FormSelectField';
import { TRANSACTION_CATEGORY_FORM_FIELD_NAMES } from 'features/transaction-category-form-modal/constants/transactionCategoryForm.constants';
import {
    useGetEntityNameTranslations,
    useGetTransactionCategoryFormFeatureTranslations,
} from 'hooks/translations.hooks';
import { CreateTransactionCategoryDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

const OPTIONS = Object.values(CreateTransactionCategoryDtoTypeEnum);

export default function TypeField(): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();
    const label = useGetTransactionCategoryFormFeatureTranslations()('type');

    return (
        <FormSelectField
            name={TRANSACTION_CATEGORY_FORM_FIELD_NAMES.type}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) =>
                getCapitalizedEnumValue(option, entityNameTranslations)
            }
        />
    );
}
