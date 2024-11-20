import cx from 'classnames';

import Button from 'components/button/Button';
import styles from 'components/menu/Menu.module.scss';
import { TMenuActionItemProps } from 'components/menu/types/menuProps';

export default function MenuActionItem({
    text,
    title,
    isDisabled,
    Icon,
    onClick,
}: TMenuActionItemProps): JSX.Element {
    return (
        <Button
            text={text}
            title={title}
            variant="ghost"
            size="small"
            isDisabled={isDisabled}
            Icon={Icon}
            onClick={onClick}
            className={cx(styles['action-item'], {
                [styles['action-item--disabled']]: isDisabled,
            })}
            style={
                Icon
                    ? {
                          flexDirection: 'row-reverse',
                          justifyContent: 'flex-end',
                      }
                    : undefined
            }
        />
    );
}
