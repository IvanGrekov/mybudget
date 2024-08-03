import styles from 'components/account-menu/AccountMenu.module.scss';
import Avatar from 'components/avatar/Avatar';
import { IAvatarProps } from 'components/avatar/types/avatarProps';
import Menu from 'components/menu/Menu';
import { IMenuProps } from 'components/menu/types/menuProps';

interface IAccountMenuProps extends IAvatarProps {
    children: IMenuProps['children'];
    avatarSize?: IAvatarProps['size'];
    tooltipPosition?: IMenuProps['tooltipPosition'];
    tooltipClassName?: string;
    actionsClassName?: string;
    actionsActiveClassName?: string;
}

export default function AccountMenu({
    name,
    avatarSize,
    image,
    children,
    tooltipPosition,
    tooltipClassName,
    actionsClassName,
    actionsActiveClassName,
}: IAccountMenuProps): JSX.Element {
    return (
        <Menu
            OpenMenuElement={
                <Avatar
                    name={name}
                    size={avatarSize}
                    image={image}
                    className={styles.avatar}
                />
            }
            tooltipPosition={tooltipPosition}
            tooltipClassName={tooltipClassName}
            actionsClassName={actionsClassName}
            actionsActiveClassName={actionsActiveClassName}
        >
            {children}
        </Menu>
    );
}
