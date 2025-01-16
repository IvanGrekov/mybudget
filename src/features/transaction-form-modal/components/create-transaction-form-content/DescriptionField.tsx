import FormTextArea from 'components/form-fields/FormTextArea';
import { DEFAULT_DESCRIPTION_MAX_LENGTH } from 'constants/formValidation.constants';
import {
    TRANSACTION_FORM_FIELD_NAMES,
    TRANSACTION_FORM_FIELD_LABELS,
} from 'features/transaction-form-modal/constants/transactionForm.constants';

export default function DescriptionField(): JSX.Element {
    return (
        <FormTextArea
            name={TRANSACTION_FORM_FIELD_NAMES.description}
            label={TRANSACTION_FORM_FIELD_LABELS.description}
            placeholder={`Enter ${TRANSACTION_FORM_FIELD_LABELS.description}`}
            maxLength={DEFAULT_DESCRIPTION_MAX_LENGTH}
            disableResize={true}
        />
    );
}
