import { useDroppable } from '@dnd-kit/core';
import cx from 'classnames';

import styles from 'components/droppable-container/DroppableContainer.module.scss';
import DropIcon from 'components/icons/DropIcon';
import { DROP_PLACEHOLDER_ID } from 'constants/dropPlaceholderId';

interface IDroppableContainerProps {
    parentId: number;
}

export default function DroppableContainer({
    parentId,
}: IDroppableContainerProps): JSX.Element | null {
    const { isOver, active, setNodeRef } = useDroppable({
        id: `${DROP_PLACEHOLDER_ID}${parentId}`,
        data: { parentId },
    });

    if (!active || active.id === parentId) {
        return null;
    }

    const isActiveWithChildren =
        !!active.data.current &&
        'hasChildren' in active.data.current &&
        !!active.data.current.hasChildren;

    if (isActiveWithChildren) {
        return null;
    }

    return (
        <div
            ref={setNodeRef}
            className={cx(styles.container, {
                [styles['container--active']]: isOver,
            })}
        >
            <DropIcon size="extraSmall" />
        </div>
    );
}
