import FormTextField from 'components/form-fields/FormTextField';
import {
    CREATE_TRANSACTION_FORM_FIELD_NAMES,
    CREATE_TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/createTransactionForm.constants';

export default function DescriptionField(): JSX.Element {
    return (
        <FormTextField
            name={CREATE_TRANSACTION_FORM_FIELD_NAMES.description}
            label={CREATE_TRANSACTION_FORM_FIELD_LABELS.description}
        />
    );
}
