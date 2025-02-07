import { MouseEvent, useRef } from 'react';

import cx from 'classnames';
import { FocusTrap } from 'focus-trap-react';

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
    iconSize,
    className,
    tooltipClassName,
    actionsClassName,
    actionsActiveClassName,
}: IMenuProps): JSX.Element {
    const menuRef = useRef<HTMLDivElement>(null);
    const menuActionsRef = useRef<HTMLDivElement>(null);

    const { isOpen, onDeactivate, onClick, OpenMenuElementWithOnClick } =
        useMenu(OpenMenuElement);

    useBodyScrollLock(isOpen);

    const onWrapperClick = (event: MouseEvent<HTMLDivElement>): void => {
        const target = event.target;

        if (target === menuRef.current || target === menuActionsRef.current) {
            return;
        }

        onDeactivate();
    };

    return (
        <FocusTrap
            active={isOpen}
            focusTrapOptions={{
                clickOutsideDeactivates: true,
                onDeactivate,
            }}
        >
            <div
                ref={menuRef}
                className={cx(styles.menu, className)}
                onClick={onWrapperClick}
            >
                <Tooltip
                    text="Open Menu"
                    open={!isOpen}
                    position={tooltipPosition}
                    openDelay={500}
                    className={tooltipClassName}
                >
                    {OpenMenuElementWithOnClick || (
                        <IconButton
                            Icon={MoreIcon}
                            onClick={onClick}
                            iconSize={iconSize}
                        />
                    )}
                </Tooltip>

                {!!OpenMenuElementWithOnClick && (
                    <button
                        onClick={onClick}
                        className={styles['button-placeholder']}
                    />
                )}

                <MenuActions
                    ref={menuActionsRef}
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
