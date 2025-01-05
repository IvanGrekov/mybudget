import FormSelectField from 'components/form-fields/FormSelectField';
import {
    CREATE_TRANSACTION_FORM_FIELD_NAMES,
    CREATE_TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/createTransactionForm.constants';
import { CreateTransactionDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedString } from 'utils/string.utils';

const OPTIONS = Object.values(CreateTransactionDtoTypeEnum).filter(
    (type) => type !== CreateTransactionDtoTypeEnum.BALANCE_CORRECTION,
);

export default function TypeField(): JSX.Element {
    return (
        <FormSelectField
            name={CREATE_TRANSACTION_FORM_FIELD_NAMES.type}
            label={CREATE_TRANSACTION_FORM_FIELD_LABELS.type}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) => getCapitalizedString(option, '_')}
        />
    );
}
