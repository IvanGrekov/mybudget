import { useDroppable } from '@dnd-kit/core';
import cx from 'classnames';

import styles from 'components/droppable-container/DroppableContainer.module.scss';
import DropIcon from 'components/icons/DropIcon';
import EyeIcon from 'components/icons/EyeIcon';
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

    if (active?.id === parentId) {
        return (
            <div className={styles.container}>
                <EyeIcon size="extraSmall" />
            </div>
        );
    }

    let isDisabled = false;

    if (!active || active.id === parentId) {
        isDisabled = true;
    }

    const isActiveWithChildren =
        !!active?.data.current &&
        'hasChildren' in active.data.current &&
        !!active.data.current.hasChildren;

    if (isActiveWithChildren) {
        isDisabled = true;
    }

    const isActiveChild =
        !!active?.data.current &&
        'isChild' in active.data.current &&
        active.data.current.isChild;

    if (isActiveChild) {
        isDisabled = true;
    }

    return (
        <div
            ref={setNodeRef}
            className={cx(styles.container, {
                [styles['container--active']]: isOver && !isDisabled,
                [styles['container--disabled']]: isDisabled,
            })}
        >
            <DropIcon size="extraSmall" />
        </div>
    );
}
