import FormSelectField from 'components/form-fields/FormSelectField';
import { TRANSACTION_FORM_FIELD_NAMES } from 'features/transaction-form-modal/constants/transactionForm.constants';
import {
    useGetEntityNameTranslations,
    useGetTransactionFormFeatureTranslations,
} from 'hooks/translations.hooks';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

const OPTIONS = Object.values(CreateTransactionDtoTypeEnum).filter(
    (type) => type !== CreateTransactionDtoTypeEnum.BALANCE_CORRECTION,
);

export default function TypeField(): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();
    const label = useGetTransactionFormFeatureTranslations()('type');

    return (
        <FormSelectField
            name={TRANSACTION_FORM_FIELD_NAMES.type}
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
