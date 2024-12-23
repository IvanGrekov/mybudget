import styles from 'components/entity-icon/EntityIcon.module.scss';
import { EIconSizes } from 'components/icons/types/iconSizes';
import {
    ENTITY_ICONS,
    DEFAULT_ACCOUNT_ICON_NAME,
    DEFAULT_CATEGORY_ICON_NAME,
} from 'constants/entityIcons.constants';

interface IEntityIconProps {
    iconName?: string;
    iconColor?: string;
    isCategory?: boolean;
    size?: EIconSizes;
}

export default function EntityIcon({
    iconName,
    iconColor,
    isCategory,
    size = EIconSizes.extraSmall,
}: IEntityIconProps): JSX.Element | null {
    const Icon = ENTITY_ICONS.get(
        iconName ||
            (isCategory
                ? DEFAULT_CATEGORY_ICON_NAME
                : DEFAULT_ACCOUNT_ICON_NAME),
    );

    if (!Icon) {
        return null;
    }

    return (
        <Icon color={iconColor} size={size} wrapperClassName={styles.icon} />
    );
}
