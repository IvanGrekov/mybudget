import FormSelectField from 'components/form-fields/FormSelectField';
import { ACCOUNT_FORM_FIELD_NAMES } from 'features/account-form-modal/constants/accountForm.constants';
import { useGetAccountFormFeatureTranslations } from 'hooks/translations.hooks';
import { CreateAccountDtoCurrencyEnum } from 'types/generated.types';

const OPTIONS = Object.values(CreateAccountDtoCurrencyEnum);

export default function CurrencyField(): JSX.Element {
    const label = useGetAccountFormFeatureTranslations()('currency');

    return (
        <FormSelectField
            name={ACCOUNT_FORM_FIELD_NAMES.currency}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
        />
    );
}
