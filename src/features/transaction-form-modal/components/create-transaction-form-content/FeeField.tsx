import FormTextField from 'components/form-fields/FormTextField';
import { TRANSACTION_FORM_FIELD_NAMES } from 'features/transaction-form-modal/constants/transactionForm.constants';
import { useGetTransactionFormFeatureTranslations } from 'hooks/translations.hooks';

export default function FeeField(): JSX.Element {
    const label = useGetTransactionFormFeatureTranslations()('fee');

    return (
        <FormTextField
            name={TRANSACTION_FORM_FIELD_NAMES.fee}
            label={label}
            type="number"
        />
    );
}
