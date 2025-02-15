import FormSelectField from 'components/form-fields/FormSelectField';
import {
    ACCOUNT_FORM_FIELD_NAMES,
    ACCOUNT_FORM_FIELD_LABELS,
} from 'features/account-form-modal/constants/accountForm.constants';
import { useGetEntityNameTranslations } from 'hooks/translations.hooks';
import { CreateAccountDtoTypeEnum } from 'types/generated.types';
import { getCapitalizedEnumValue } from 'utils/string.utils';

const OPTIONS = Object.values(CreateAccountDtoTypeEnum);

export default function TypeField(): JSX.Element {
    const entityNameTranslations = useGetEntityNameTranslations();

    return (
        <FormSelectField
            name={ACCOUNT_FORM_FIELD_NAMES.type}
            label={ACCOUNT_FORM_FIELD_LABELS.type}
            options={OPTIONS}
            isClearable={false}
            required={true}
            getOptionLabel={(option) =>
                getCapitalizedEnumValue(option, entityNameTranslations)
            }
        />
    );
}
