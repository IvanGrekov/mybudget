import { useFormContext } from 'react-hook-form';

import EntityIconColorField from 'components/entity-icon-color-field/EntityIconColorField';
import { DEFAULT_ENTITY_ICON_COLOR } from 'constants/entityIcons.constants';
import { TCreateAccountFormValues } from 'features/account-form-modal/types/createAccountFormValues';

export default function IconColorField(): JSX.Element | null {
    const { watch, setValue } = useFormContext<TCreateAccountFormValues>();

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
