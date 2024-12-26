import { useFormContext } from 'react-hook-form';

import EntityIconNameField from 'components/entity-icon-name-field/EntityIconNameField';
import {
    DEFAULT_ACCOUNT_ICON_NAME,
    DEFAULT_ENTITY_ICON_COLOR,
    ENTITY_ICONS,
} from 'constants/entityIcons.constants';
import { TCreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';

export default function IconNameField(): JSX.Element | null {
    const { watch, setValue } = useFormContext<TCreateAccountFormValues>();

    const iconName = watch('iconName') || DEFAULT_ACCOUNT_ICON_NAME;
    const iconColor = watch('iconColor') || DEFAULT_ENTITY_ICON_COLOR;
    const Icon = ENTITY_ICONS.get(iconName);

    if (!Icon) {
        return null;
    }

    return (
        <EntityIconNameField
            Icon={Icon}
            iconColor={iconColor}
            selectedIconName={iconName}
            changeIconName={(iconName) => setValue('iconName', iconName)}
        />
    );
}
