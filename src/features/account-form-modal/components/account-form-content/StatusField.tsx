import FormSelectField from 'components/form-fields/FormSelectField';
import {
    ACCOUNT_FORM_FIELD_NAMES,
    ACCOUNT_FORM_FIELD_LABELS,
} from 'features/account-form-modal/constants/accountForm.constants';
import { EditAccountDtoStatusEnum } from 'types/generated.types';
import { getCapitalizedString } from 'utils/string.utils';

const OPTIONS = Object.values(EditAccountDtoStatusEnum);

export default function StatusField(): JSX.Element {
    return (
        <FormSelectField
            name={ACCOUNT_FORM_FIELD_NAMES.status}
            label={ACCOUNT_FORM_FIELD_LABELS.status}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) => getCapitalizedString(option)}
        />
    );
}
