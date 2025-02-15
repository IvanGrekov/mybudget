import FormSelectField from 'components/form-fields/FormSelectField';
import {
    TRANSACTION_FORM_FIELD_NAMES,
    TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/transactionForm.constants';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

const OPTIONS = Object.values(CreateTransactionDtoTypeEnum).filter(
    (type) => type !== CreateTransactionDtoTypeEnum.BALANCE_CORRECTION,
);

export default function TypeField(): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();

    return (
        <FormSelectField
            name={TRANSACTION_FORM_FIELD_NAMES.type}
            label={TRANSACTION_FORM_FIELD_LABELS.type}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) =>
                getCapitalizedEnumValue(option, entityNameTranslations)
            }
        />
    );
}
