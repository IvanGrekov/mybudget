import FormTextArea from 'components/form-fields/FormTextArea';
import { DEFAULT_DESCRIPTION_MAX_LENGTH } from 'constants/formValidation.constants';
import { TRANSACTION_FORM_FIELD_NAMES } from 'features/transaction-form-modal/constants/transactionForm.constants';
import { useGetTransactionFormFeatureTranslations } from 'hooks/translations.hooks';

export default function DescriptionField(): JSX.Element {
    const label = useGetTransactionFormFeatureTranslations()('description');

    return (
        <FormTextArea
            name={TRANSACTION_FORM_FIELD_NAMES.description}
            label={label}
            placeholder={label}
            maxLength={DEFAULT_DESCRIPTION_MAX_LENGTH}
            disableResize={true}
        />
    );
}
