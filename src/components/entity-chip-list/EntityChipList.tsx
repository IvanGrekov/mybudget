import Chip from 'components/chip/Chip';
import { IChipProps } from 'components/chip/types/chipProps';
import styles from 'components/entity-chip-list/EntityChipList.module.scss';

interface IEntityChipListProps {
    items: IChipProps[];
}

export default function EntityChipList({
    items,
}: IEntityChipListProps): JSX.Element {
    return (
        <div className={styles.chips}>
            {items.map(
                ({ size = 'small', titleVariant = 'body2', ...rest }, i) => (
                    <Chip
                        key={i}
                        size={size}
                        titleVariant={titleVariant}
                        {...rest}
                    />
                ),
            )}
        </div>
    );
}
