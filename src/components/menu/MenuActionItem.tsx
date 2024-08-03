import Button from 'components/button/Button';
import styles from 'components/menu/Menu.module.scss';
import { TMenuActionItemProps } from 'components/menu/types/menuProps';

export default function MenuActionItem({
    text,
    onClick,
    title,
    Icon,
}: TMenuActionItemProps): JSX.Element {
    return (
        <Button
            text={text}
            onClick={onClick}
            title={title}
            variant="ghost"
            size="small"
            Icon={Icon}
            className={styles['action-item']}
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
