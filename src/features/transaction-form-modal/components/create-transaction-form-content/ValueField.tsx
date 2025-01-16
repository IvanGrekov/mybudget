import FormTextField from 'components/form-fields/FormTextField';
import {
    TRANSACTION_FORM_FIELD_NAMES,
    TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/transactionForm.constants';

export default function ValueField(): JSX.Element {
    return (
        <FormTextField
            name={TRANSACTION_FORM_FIELD_NAMES.value}
            label={TRANSACTION_FORM_FIELD_LABELS.value}
            type="number"
            required={true}
        />
    );
}
