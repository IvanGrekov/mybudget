import { useFormContext } from 'react-hook-form';

import EntityIconColorField from 'components/entity-icon-color-field/EntityIconColorField';
import { DEFAULT_ENTITY_ICON_COLOR } from 'constants/entityIcons.constants';
import { TCreateTransactionCategoryFormValues } from 'features/transaction-category-form-modal/types/createTransactionCategoryFormValues';

export default function IconColorField(): JSX.Element | null {
    const { watch, setValue } =
        useFormContext<TCreateTransactionCategoryFormValues>();

    const iconColor = watch('iconColor') || DEFAULT_ENTITY_ICON_COLOR;

    return (
        <EntityIconColorField
            selectedIconColor={iconColor}
            changeIconColor={(color) =>
                setValue('iconColor', color, {
                    shouldDirty: true,
                    shouldTouch: true,
                })
            }
        />
    );
}
