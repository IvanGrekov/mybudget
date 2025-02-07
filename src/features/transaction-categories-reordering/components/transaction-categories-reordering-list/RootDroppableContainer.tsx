import { useDroppable } from '@dnd-kit/core';
import cx from 'classnames';

import styles from 'components/droppable-container/DroppableContainer.module.scss';
import DropIcon from 'components/icons/DropIcon';
import { DROP_PLACEHOLDER_ID } from 'constants/dropPlaceholderId';
import {
    TOP_SUFFIX,
    BOTTOM_SUFFIX,
} from 'features/transaction-categories-reordering/components/transaction-categories-reordering-list/constants/rootDroppableContainerSuffixes';

interface IRootDroppableContainerProps {
    isTop?: boolean;
}

export default function RootDroppableContainer({
    isTop,
}: IRootDroppableContainerProps): JSX.Element | null {
    const { isOver, active, setNodeRef } = useDroppable({
        id: `${DROP_PLACEHOLDER_ID}_${isTop ? TOP_SUFFIX : BOTTOM_SUFFIX}`,
    });

    if (!active) {
        return null;
    }

    const isActiveSubcategory =
        !!active.data.current &&
        'isChild' in active.data.current &&
        !!active.data.current.isChild;

    if (!isActiveSubcategory) {
        return null;
    }

    return (
        <div
            ref={setNodeRef}
            className={cx(styles.container, {
                [styles['container--active']]: isOver,
            })}
        >
            <DropIcon />
        </div>
    );
}
