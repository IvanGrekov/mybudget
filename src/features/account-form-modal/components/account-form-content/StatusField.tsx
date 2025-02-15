import FormSelectField from 'components/form-fields/FormSelectField';
import { ACCOUNT_FORM_FIELD_NAMES } from 'features/account-form-modal/constants/accountForm.constants';
import { useGetAccountFormFeatureTranslations } from 'hooks/translations.hooks';
import { EditAccountDtoStatusEnum } from 'types/generated.types';
import { getCapitalizedString } from 'utils/string.utils';

const OPTIONS = Object.values(EditAccountDtoStatusEnum);

export default function StatusField(): JSX.Element {
    const label = useGetAccountFormFeatureTranslations()('status');

    return (
        <FormSelectField
            name={ACCOUNT_FORM_FIELD_NAMES.status}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) => getCapitalizedString(option)}
        />
    );
}
