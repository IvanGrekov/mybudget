import FormTextField from 'components/form-fields/FormTextField';
import { TRANSACTION_FORM_FIELD_NAMES } from 'features/transaction-form-modal/constants/transactionForm.constants';
import { useGetTransactionFormFeatureTranslations } from 'hooks/translations.hooks';

export default function ValueField(): JSX.Element {
    const label = useGetTransactionFormFeatureTranslations()('value');

    return (
        <FormTextField
            name={TRANSACTION_FORM_FIELD_NAMES.value}
            label={label}
            type="number"
            required={true}
        />
    );
}
