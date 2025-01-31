import { useFormContext } from 'react-hook-form';

import EntityIconNameField from 'components/entity-icon-name-field/EntityIconNameField';
import {
    DEFAULT_CATEGORY_ICON_NAME,
    DEFAULT_ENTITY_ICON_COLOR,
    ENTITY_ICONS,
} from 'constants/entityIcons.constants';
import { TCreateTransactionCategoryFormValues } from 'features/transaction-category-form-modal/types/createTransactionCategoryFormValues';

export default function IconNameField(): JSX.Element | null {
    const { watch, setValue } =
        useFormContext<TCreateTransactionCategoryFormValues>();

    const iconName = watch('iconName') || DEFAULT_CATEGORY_ICON_NAME;
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
            changeIconName={(iconName) =>
                setValue('iconName', iconName, {
                    shouldDirty: true,
                    shouldTouch: true,
                })
            }
        />
    );
}
