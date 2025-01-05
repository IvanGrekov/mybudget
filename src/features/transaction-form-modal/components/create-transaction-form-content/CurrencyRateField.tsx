import FormTextField from 'components/form-fields/FormTextField';
import {
    CREATE_TRANSACTION_FORM_FIELD_NAMES,
    CREATE_TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/createTransactionForm.constants';
import { roundValue } from 'utils/roundValue';

export default function CurrencyRateField(): JSX.Element {
    return (
        <FormTextField
            name={CREATE_TRANSACTION_FORM_FIELD_NAMES.currencyRate}
            label={CREATE_TRANSACTION_FORM_FIELD_LABELS.currencyRate}
            type="number"
            disabled={true}
            formatValue={roundValue}
        />
    );
}
