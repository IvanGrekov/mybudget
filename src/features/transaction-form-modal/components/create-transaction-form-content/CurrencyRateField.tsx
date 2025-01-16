import FormTextField from 'components/form-fields/FormTextField';
import {
    TRANSACTION_FORM_FIELD_NAMES,
    TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/transactionForm.constants';
import { roundValue } from 'utils/roundValue';

export default function CurrencyRateField(): JSX.Element {
    return (
        <FormTextField
            name={TRANSACTION_FORM_FIELD_NAMES.currencyRate}
            label={TRANSACTION_FORM_FIELD_LABELS.currencyRate}
            type="number"
            disabled={true}
            formatValue={roundValue}
        />
    );
}
