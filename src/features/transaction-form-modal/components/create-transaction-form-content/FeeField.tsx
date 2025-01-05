import FormTextField from 'components/form-fields/FormTextField';
import {
    CREATE_TRANSACTION_FORM_FIELD_NAMES,
    CREATE_TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/createTransactionForm.constants';

export default function FeeField(): JSX.Element {
    return (
        <FormTextField
            name={CREATE_TRANSACTION_FORM_FIELD_NAMES.fee}
            label={CREATE_TRANSACTION_FORM_FIELD_LABELS.fee}
            type="number"
        />
    );
}
