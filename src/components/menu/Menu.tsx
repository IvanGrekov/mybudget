import FocusTrap from 'focus-trap-react';

import IconButton from 'components/button/IconButton';
import MoreIcon from 'components/icons/MoreIcon';
import styles from 'components/menu/Menu.module.scss';
import MenuActions from 'components/menu/MenuActions';
import { useMenu } from 'components/menu/hooks/useMenu';
import { IMenuProps } from 'components/menu/types/menuProps';
import Tooltip from 'components/tooltip/Tooltip';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';

export default function Menu({
    children,
    OpenMenuElement,
    tooltipPosition,
    tooltipClassName,
    actionsClassName,
    actionsActiveClassName,
}: IMenuProps): JSX.Element {
    const { isOpen, onDeactivate, onClick, OpenMenuElementWithOnClick } =
        useMenu(OpenMenuElement);

    useBodyScrollLock(isOpen);

    return (
        <FocusTrap
            active={isOpen}
            focusTrapOptions={{
                clickOutsideDeactivates: true,
                onDeactivate,
            }}
        >
            <div className={styles.menu} onClick={onDeactivate}>
                <Tooltip
                    text="Open Menu"
                    open={!isOpen}
                    position={tooltipPosition}
                    className={tooltipClassName}
                >
                    {OpenMenuElementWithOnClick || (
                        <IconButton Icon={MoreIcon} onClick={onClick} />
                    )}
                </Tooltip>

                {!!OpenMenuElementWithOnClick && (
                    <button
                        onClick={onClick}
                        className={styles['button-placeholder']}
                    />
                )}

                <MenuActions
                    isOpen={isOpen}
                    className={actionsClassName}
                    activeClassName={actionsActiveClassName}
                >
                    {children}
                </MenuActions>
            </div>
        </FocusTrap>
    );
}

export { default as MenuActionItem } from 'components/menu/MenuActionItem';
