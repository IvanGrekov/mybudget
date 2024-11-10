import { PropsWithChildren } from 'react';

import {
    KeyboardSensor,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
    DndContext,
    closestCenter,
    DragEndEvent,
    DragOverEvent,
} from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    SortableContext,
} from '@dnd-kit/sortable';

import { ROOT_CONTAINER_ID } from 'constants/dragDrop.constants';

interface IDragDropContextProps extends PropsWithChildren {
    items: { id: number }[];
    handleDragEnd: (event: DragEndEvent) => void;
    handleDragOver?: (event: DragOverEvent) => void;
}

export default function DragDropContext({
    items,
    children,
    handleDragEnd,
    handleDragOver,
}: IDragDropContextProps): JSX.Element {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // NOTE: Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // NOTE: Press delay of 125ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 125,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <SortableContext items={items} id={ROOT_CONTAINER_ID}>
                {children}
            </SortableContext>
        </DndContext>
    );
}
