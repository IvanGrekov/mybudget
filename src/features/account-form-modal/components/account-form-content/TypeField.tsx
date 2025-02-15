import FormSelectField from 'components/form-fields/FormSelectField';
import { ACCOUNT_FORM_FIELD_NAMES } from 'features/account-form-modal/constants/accountForm.constants';
import {
    useGetEntityNameTranslations,
    useGetAccountFormFeatureTranslations,
} from 'hooks/translations.hooks';
import { CreateAccountDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

const OPTIONS = Object.values(CreateAccountDtoTypeEnum);

export default function TypeField(): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();
    const label = useGetAccountFormFeatureTranslations()('type');

    return (
        <FormSelectField
            name={ACCOUNT_FORM_FIELD_NAMES.type}
            label={label}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) =>
                getCapitalizedEnumValue(option, entityNameTranslations)
            }
        />
    );
}
