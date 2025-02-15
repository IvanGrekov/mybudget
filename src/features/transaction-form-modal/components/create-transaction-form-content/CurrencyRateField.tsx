import FormTextField from 'components/form-fields/FormTextField';
import { TRANSACTION_FORM_FIELD_NAMES } from 'features/transaction-form-modal/constants/transactionForm.constants';
import { useGetTransactionFormFeatureTranslations } from 'hooks/translations.hooks';
import { roundCurrencyRate } from 'utils/roundCurrencyRate';

export default function CurrencyRateField(): JSX.Element {
    const label = useGetTransactionFormFeatureTranslations()('currency_rate');

    return (
        <FormTextField
            name={TRANSACTION_FORM_FIELD_NAMES.currencyRate}
            label={label}
            type="number"
            disabled={true}
            formatValue={roundCurrencyRate}
        />
    );
}
