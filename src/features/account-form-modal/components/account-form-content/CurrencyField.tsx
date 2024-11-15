import FormSelectField from 'components/form-fields/FormSelectField';
import {
    ACCOUNT_FORM_FIELD_NAMES,
    ACCOUNT_FORM_FIELD_LABELS,
} from 'features/account-form-modal/constants/accountForm.constants';
import { CreateAccountDtoCurrencyEnum } from 'types/generated.types';

const OPTIONS = Object.values(CreateAccountDtoCurrencyEnum);

export default function CurrencyField(): JSX.Element {
    return (
        <FormSelectField
            name={ACCOUNT_FORM_FIELD_NAMES.currency}
            label={ACCOUNT_FORM_FIELD_LABELS.currency}
            options={OPTIONS}
            isClearable={false}
            required={true}
        />
    );
}
