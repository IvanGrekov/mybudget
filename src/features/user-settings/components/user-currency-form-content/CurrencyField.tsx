import FormSelectField from 'components/form-fields/FormSelectField';
import {
    USER_CURRENCY_FORM_FIELD_NAMES,
    USER_CURRENCY_FORM_FIELD_LABELS,
} from 'features/user-settings/constants/userCurrencyForm.constants';
import { EditUserCurrencyDtoDefaultCurrencyEnum } from 'types/generated.types';

const OPTIONS = Object.values(EditUserCurrencyDtoDefaultCurrencyEnum);

export default function CurrencyField(): JSX.Element {
    return (
        <FormSelectField
            name={USER_CURRENCY_FORM_FIELD_NAMES.defaultCurrency}
            label={USER_CURRENCY_FORM_FIELD_LABELS.defaultCurrency}
            options={OPTIONS}
            shouldAddSearch={true}
            isClearable={false}
            required={true}
        />
    );
}
